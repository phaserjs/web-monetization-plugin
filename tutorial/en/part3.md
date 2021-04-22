---
title: Web Monetization for Games
subtitle: Part 3 - An overview of the plugin
date: 
author: Richard Davey
twitter: photonstorm
---

# An overview of the plugin

Let's get started implementing the Game Web Monetization plugin and see what features are available.

Before we can start you should have already signed-up with Coil and a digital wallet service provider like Uphold. If you've not done this yet, please return to [Part 2](part2) and do so, as everything from this point on relies on it.

Login to the [Coil website](https://coil.com) and then in **Settings** look for **Payouts** and you will see your Payment Pointer:

![PaymentPointer](../img/part3/1-paymentpointer.png)

To check it's working, lets create a simple test page. Open your favorite editor (for this tutorial we'll use VS Code), create a new folder and inside of that save empty `index.html` and `main.js` files.

![Base files](../img/part3/2-basefiles.png)

We'll edit `index.html` first and create its basic structure by calling `main.js` and defining it as a module:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Web Monetization</title>
</head>
<body>
    <script src="./main.js" type="module"></script>
</body>
</html>
```

Now it's time to [download the Game Web Monetization plugin](https://github.com/photonstorm/gamewebmonetization/blob/main/plugin/dist/GameWebMonetization.js) - save this file alongside the index and main files you've already got:

![Base](../img/part3/3-basefileswithplutin.png)

This version of the plugin exposes itself as an ESM (ES Module), so we can load it directly in `main.js`. For this tutorial we're going to use imports and modern JavaScript. However, you can also find ES5 and TypeScript versions of the plugin in the GitHub repository, should you require them. For the rest of this tutorial, though, we'll assume you're using the ESM.

Let's edit `main.js` to import our plugin:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
```

With the module imported we can instantiate the plugin. The constructor requires a configuration object that contains a `paymentPointer`. This is why it's important you've already obtained one from your wallet service.

Add the following to `main.js` and remember to replace the `paymentPointer` value below with your own:

```javascript
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
```

What we've done is import the module, create an instance of the plugin and assign a Payment Pointer to it. Now, we just have to start it.

Open `index.html` in a browser. For this tutorial we're using [Visual Studio Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, but you can use any method, so long as the file is being served to your browser and not just opened directly.

Once open, it will still appear that the site is not monetizable. This is because we have prepared the plugin but have not _started_ monetization:

![No monetizable coil plugin](../img/part3/4-nomonetizable.png)

Let's go back and edit `main.js` to start the monetization process. This is done with the `start()` method:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
gameWebMonetization.start();
```

Now, if we go back to the browser and refresh we will see that our site begins to monetize itself:

![Monetizable](../img/part3/5-ismonetizable.png)

**Congratulations!** This page is now streaming tiny amounts of currency into your digital wallet via the Interledger protocol. If something went wrong remember to check:

1. That you have a Coil account with a subscription.
2. That you have fully verified your Uphold (or other wallet) service
3. That the Payment Pointer URL has been changed in the code to your own.
4. That you are serving the test page, not opening it directly in a browser.

With only this configuration you have already successfully monetized this page. However, it's important to at least give some reward to the players of your game. To do this you can take advantage of the methods and properties that the plugin offers. Let's dive into those now.

## Methods, Properties and Events of the Plugin

The plugin will emit four key events:

1. `start`
2. `stop`
3. `pending`
4. `progress`

You can listen for each of these from your game code because the Game Web Monetization Plugin is an Event Emitter. This means you can use the following methods directly on the plugin:

```js
once('event-name', eventHandler, context);
on('event-name', eventHandler, context);
off('event-name', eventHandler, context);
```

If you prefer to be more verbose, you can use `addListener` instead of `on` and `removeListener` instead of `off`. We will use the short version in the following code.

### The START Event

This event is emitted when Web Monetization API is successfully started.

To use it, you can bind your own listener to the `GameWebMonetization.START` event:

```js
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    // Your handler
});
```

**Tip:** Remember to do this _before_ calling `start()` on the plugin!

To test this, let's make it log out some information to the console when the event fires, so we can observe what it returns in our browser Dev Tools:

Add the following code to your `main.js` file, _before_ you call `gameWebMonetization.start()`:

```javascript
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log(event);
});
```

If you now test this, you should see the following in your Dev Tools console:

![Result of Event Start](../img/part3/6-resulteventstart.png)

The event handler is sent an object that contains the following properties:

property | details
--- | ---
`paymentPointer` | Your payment account URL. The same value is used as the content in your tag.
`requestId` | This value is identical to the session ID/monetization ID (UUID v4) generated by the user agent .

You may have noticed we've been sent both `paymentPointer` and a `requestId`.

You can use the `start` event to know that your game is being monetized. At this point you could show a message to the player, thanking them, or perhaps unlocking some extra content.

**Important:** Every time you change the browser window, or swap to another browser tab, the monetization stops. When the player returns to the window, the `start` event will be fired again. So be aware of this flow in your game code and handle it appropriately.

### isMonetized

The `start` event is useful to know when monetization _begins_, but what if you want to check if your game is monetized or not somewhere deeper in your code?

For this, you can use the `isMonetized` boolean property.

This property can be checked at any point in your game and provides a simple true/false response to the question "Has this player monetized my game?"

Let's test this by modifying our `main.js` to console log the state of the property before and after the `start` event:

```javascript
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

// New code:
console.log('Is monetized? ', gameWebMonetization.isMonetized);

gameWebMonetization.start();

// New code:
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log('[inside event start] - Is monetized? ', gameWebMonetization.isMonetized);
});
```

If you test this code you'll see that before the monetization starts the property is `false` and it switches to `true` after the `start` event has fired:

![isMonetized result](../img/part3/7-ismonetized_result.png)

You you can check the `isMonetized` property at any point in your game. It is kept up to date internally by the plugin, so is safe to use to perhaps award the player a special prize or in-game benefit.

### Knowing the current State

The plugin goes through different states in its life-cycle:

1. **started** - The plugin has been successfully started and is monetising your content.
2. **stopped** - The plugin is currently stopped and not monetising your content.
3. **pending** - The plugin has been asked to start and is currently trying to negotiate the start-up, but hasn't yet completed this step.

To know the current state you can query the `state` property.

Let's do the same as we did with `isMonetized` to view the `state`. Here is an updated `main.js` to test this:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

// New code
console.log('The state: ', gameWebMonetization.state);
 
gameWebMonetization.start();
 
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    // New code
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});
```

And in the console you will see the following:

![The state](../img/part3/8-thesate.png)

Access to the plugins state is handy for internal debugging.

### The PENDING Event

This event is emitted while the Web Monetization API is preparing to start to monetize your site. This happens after you call the `start` method on the plugin. The API will enter a state of 'pending', meaning it's currently negotiating to start with your Payment Pointer, but hasn't finished doing so yet. If the negotiation is successful, then the plugin will emit its `START` event.

Let's edit our `main.js` to demonstrate this state:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
console.log('The state: ', gameWebMonetization.state);
 
gameWebMonetization.start();

// New code
gameWebMonetization.on(GameWebMonetization.PENDING, (event) => {
    console.log('[inside event pending] - The state: ', gameWebMonetization.state);
});
 
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});
```

If we go to the browser we will see the following:

![Pending event](../img/part3/9-pending_event.png)

Looking at the console logs you can see the API flow in action.

If there is a problem connecting to your Payment Pointer then the flow would be `PENDING` followed by the `STOP` event. If the connection was successful the flow would be `PENDING` followed by the `START` event.

If there is a network error, for example wifi drops out, while the request is still `PENDING` then it will remain in this state indefinitely, never reaching the `STOP` event. So always use the `isMonetized` boolean in your game code to be aware of the _current_ state of monetization.

### The PROGRESS Event

When the Web Monetization API successfully connects to your Payment Pointer it will start to stream micropayments into your wallet. Each time this happens it will fire a `PROGRESS` event.

This event contains lots of useful data, including how much was just streamed to your wallet and you can use it in your game to keep track of the payment stream, or perhaps use it to visually show a special animation or similar.

You can use the event like this:

```javascript
gameWebMonetization.on(GameWebMonetization.PROGRESS, (event) => {
    console.log('Progress: ', event);
});
```

Add the above into your `main.js` and check it from a browser. Open the console to view the output:

![Progress event](../img/part3/10-progress_event.png)

This event gives us lots of useful properties:

property | details
--- | ---
`paymentPointer` | Your payment account URL. The same value is used as the content in your tag.
`requestId` | This value is identical to the session ID/monetization ID (UUID v4) generated by the user agent.
`amount` | The destination amount received as specified in the Interledger protocol (ILP) packet.
`assetCode` | The code (typically three characters) identifying the amount's unit. A unit, for example, could be a currency (USD, XRP). 
`assetScale` | The number of places past the decimal for the amount. For example, if you have USD with an asset scale of two, then the minimum divisible unit is cents.
`receipt` | base64-encoded STREAM receipt issued by the Web Monetization receiver to the Web Monetization provider as proof of the total amount received in the stream.
`totalAmount` | the sum of what has been received with the current paymentPointer, if the paymentPointer is changed this amount will be reset.

As you can see, that's a lot of handy data!

Perhaps the most interesting properties are `assetCode` and `totalAmount`. The `assetCode` is the type of currency we are receiving, in this case it is the XRP cryptocurrency. Don't worry, the Interledger protocol will convert this automatically into your chosen currency.

The `totalAmount` is the amount of income that we have obtained so far from the player during _this play session_. This counter is reset if the page containing your game is refreshed. It doesn't persist longer than a single play session.

As its name implies, the `PROGRESS` event helps you keep track of the monetization process at all times. Because the stream of payments to your wallet is constant this event is fired many times. During testing we saw it fired _every 2 seconds_ that the game was running, but the actual frequency may be higher or lower than this. So be careful with what your game does as a result of this event!

Rather than hooking this event to say an in-game animation, you may be better off aggregating the information within it, then using that from your own timed in-game events.

### The `total` property

As we saw, the `PROGRESS` event gives us lots of handy data. The plugin offers you a `total` property that keeps track of the total amount of payments a player has streamed to your wallet during their play session.

This value persists even if they tab out to another application and then come back to your game.

You can access the `total` at any point via the plugin instance:

```javascript
const currentTotal = gameWebMonetization.total;
```

The currency of the `total` is set by the Web Monetization API and the Interledger protocol (typically USD or XRP), not by your wallet. This actual currency can be obtained from the `assetCode` property sent by the `PROGRESS` event.

The currency is automatically converted by the protocol to your wallets currency before being received. However, it's important to remember that if you've got say a DOGE Coin Payment Pointer, the `total` value isn't the amount of DOGE received, but an intermediary currency, likely XRP.

### The STOP Event

Finally, we have the `STOP` event. This event is emitted when the API enters a stopped state. This could be from you calling the plugins `stop` method, or by the user stopping the payment via their browser by performing an action such as switching to another browser tab or window.

You listen for it in the same way as the other events. Let's modify our `main.js` to handle this:

```javascript
gameWebMonetization.on(GameWebMonetization.STOP, (event) => {
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});
```

Once the event handler is created it will be emitted if we call the `stop` method, or switch to another browser tab.

Try running the above and then swapping in and out of the tab a few times. You should see a `STOP` event for each time you do this:

![Stop Event](../img/part3/11-stop_event.png)

Alternatively, we could fake this action by using `setTimeout` to call the `stop` method for us, like in the following code:
 
```javascript
gameWebMonetization.on(GameWebMonetization.STOP, (receive) => {
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});
 
setTimeout(() => {
    gameWebMonetization.stop();
}, 5000);
```

Now, if you go to the console you will see that the progress event is emitted and then the plugin stops after 5 seconds.

You can use the `STOP` event to know when monetization has stopped. Just remember that it's entirely possible it will start again, i.e. if they swapped tab or application.

### Change the Payment Pointer

If you need to change the Payment Pointer your game is using, you can call the `changePaymentPointer` method.

Simply call the method and pass it a new configuration object:

```javascript
gameWebMonetization.changePaymentPointer({
    paymentPointer: '$ilp.uphold.com/ziW6E7iwKUkp',
    pointerName: "Alice"
});
gameWebMonetization.restart();
```

Calling `changePaymentPointer()` only prepares the plugin for the change, but doesn't make it. For that, you need to call the `restart()` method, as in the example code above.

Payment Pointers can also be provided as a weighted array. This allows you to take advantage of probabilistic revenue sharing, which we'll cover in the next part of the tutorial.

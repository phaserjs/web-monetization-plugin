---
title: Web Monetization for Games
subtitle: Part 3 - How to use the Plugin
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

Let's get started implementing the Game Web Monetization plugin and see what features are available.

Before we can start you should have already signed-up with Coil and a digital wallet service provider like Uphold. If you've not done this yet, please return to [Part 2](part2) and do so, as everything from this point on relies on it.

Login to the [Coil website](https://coil.com) and then in **Settings** look for **Payouts** and you will see your Payment Pointer:

![PaymentPointer](part3/1-paymentpointer.png)

## Download the Plugin

Download or check-out the [Game Web Monetization GitHub repo](https://github.com/photonstorm/gamewebmonetization). If you're familiar with using git, then you can checkout via http:

```
https://github.com/photonstorm/gamewebmonetization.git
```

Or ssh:

```
git@github.com:photonstorm/gamewebmonetization.git
```

If you'd prefer, you can [download a zip file](https://github.com/photonstorm/gamewebmonetization/archive/refs/heads/main.zip) of the whole repo.

Once the files are on your computer you will find the plugin in the `plugin/dist/` folder, it's called `GameWebMonetization.js`.

## Creating a Test Page

To check it's working, lets create a simple test page. Open your favorite code editor, create a new folder, and inside of that save blank `index.html` and `main.js` files.

![Base files](part3/2-basefiles.png)

We'll edit `index.html` first and create its basic structure by calling `main.js` and defining it as a module. Paste the following into the index file:

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

Copy the plugin from `plugin/dist/GameWebMonetization.js` so it's alongside the index and main files you've already got:

![Base](part3/3-basefileswithplutin.png)

This version of the plugin exposes itself as an ESM (ES Module), so we can load it directly in `main.js`. For this tutorial we're going to use imports and modern JavaScript. However, you can also find ES5 and TypeScript versions in the `plugin` folder, too, should you require them. For the rest of this tutorial, though, we'll use the ESM.

Edit `main.js` to import our plugin:

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

![No monetizable coil plugin](part3/4-nomonetizable.png)

Let's go back and edit `main.js` to start the monetization process. This is done with the `start()` method:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
gameWebMonetization.start();
```

Now, if we go back to the browser and refresh we will see that our site begins to monetize itself:

![Monetizable](part3/5-ismonetizable.png)

**Congratulations!** This page is now streaming tiny amounts of currency into your digital wallet via the Interledger protocol. 

If something went wrong remember to check:

1. That you have a Coil account with a subscription.
2. That you have fully verified your Uphold (or other wallet) service
3. That the Payment Pointer URL has been changed in the code to your own.
4. That you are serving the test page, not opening it directly in a browser.

With only this configuration you have already successfully monetized this page. However, it's important to at least give some reward to the players of your game. To do this you can take advantage of the methods and properties that the plugin offers. Let's dive into those next.

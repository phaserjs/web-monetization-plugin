---
title: Web Monetization for Games
subtitle: How to use the plugin in a Phaser 3 game
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

We learned how to use test the different features of the plugin in the previous part of this tutorial series. If you missed that, please re-read it first. Now, it's time to use it in a proper Phaser 3 game. In this tutorial we're going to take a ready-made Phaser game and work through implementing the Game Web Monetization plugin into it.

## Download the Game Files

To get started, please download or check-out the [Game Web Monetization GitHub repo](https://github.com/photonstorm/gamewebmonetization). If you're familiar with using git, then you can checkout the repo via http:

```
https://github.com/photonstorm/gamewebmonetization.git
```

Or ssh:

```
git@github.com:photonstorm/gamewebmonetization.git
```

If you'd prefer, you can [download a zip file](https://github.com/photonstorm/gamewebmonetization/archive/refs/heads/main.zip) of the whole repo

Once the files are on your computer you will find the sample game in the `tutorial/examples/3Candies` folder.

Drag and drop the folder into Visual Studio Code or your editor of choice so you can easily look at the source code of the various files.

## Project Structure

Inside the game folder we can see an `index.html` file, along with `src` and `phaser` folders. Everything is already preconfigured to run, so let's dive into the `src` folder.

Within `src/plugins` you'll see a folder with the Game Web Monetization plugin inside it.

![Structure folder](../img/part5/1-structure_folders.png)

This game is split into 4 Phaser Scenes:

1. **Intro** - The intro message and plugin check.
2. **BackgroundScene** - The scrolling background behind the game.
3. **Menu** - The Main Menu.
4. **MainScene** - The Game itself.

![Scenes folder](../img/part5/2-scenes_folder.png)

There is also another important file: `src/global_vars.js`:

![Global vars](../img/part5/3-global_vars.png)

This file contains all of the variables you can easily change to modify the game itself. If you open the file into your editor you'll see a commented section where the plugin configuration is stored.

You'll also see an object called `background_selected`. Within this the `active` property is set to `normal`. This controls if the game is running in Web Monetized mode, or not and is used by the **Menu** and **BackgroundScene** to display different game backgrounds.

You can edit it from `normal` to `premium` to see the difference when you play the game, without having to have monetization active. But please make sure you set it back to `normal` before carrying on with this tutorial.

![Normal selected](../img/part5/4-background_selected.png)

## Adding Monetized Benefits

We're going to add the following benefits to the player if they Web Monetize our game:

* A "Thank You!" intro message.
* The option to change the background for a more colorful one.
* They'll gain 1 extra life during play.

Run the game by opening the `index.html` with your web server of choice. As before, we'll use the VS Code Live Server extension for this. Open the browser and you should see that the game has started:

![First start game](../img/part5/5-first_start_game.png)

We've added an intro screen to our game. This is because it can take a few seconds for the Web Monetization API to negotiate, which is plenty of time to show them a short message about the benefits of it.

### Importing the Plugin

The time has come to put the plugin in our game.

Edit the `global_vars.js` file and import the plugin at the top of the file and then create an instance of the plugin:

```js
import { GameWebMonetization } from "./plugins/GameWebMonetization/GameWebMonetization.js";

// Monetization config
export const gamewebmonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
```

Remember to add the above code directly under the `CandyGrid` import statement.

The code you added should look like this:

![Config payment pointer and plugin](../img/part5/6-config_paymentpointer_and_plugin.png)

The plugin has been imported and created, with our Payment Pointer set. Now we need to start the plugin in the `scenes/Intro.js` file.

Edit `Intro.js` and import the plugin instance, so we can use it:

```javascript
import { gamewebmonetization } from "../global_vars.js";
```

As you learned in the previous tutorial, the plugin needs its `start` method called before it'll do anything. We will do this in the Scene `init` method.

Add the following line of code to the start of `init`:

```js
gamewebmonetization.start();
```

So it looks like this:

```js
    init ()
    {
        gamewebmonetization.start();

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.changingScene = true;
```

With the `import` and the `start()` call your code should now look like this:

![Start Monetization](../img/part5/7-start_monetization.png)

Restart the game in the browser and if you have the Coil extension working you'll see the game is monetized:

![Monetized via the Coil extension](../img/part5/8-ismonetized_extension.png)

## Adding the Player Benefits

Starting monetization is all good and well, but now we really ought to start giving some benefits to the players that are supporting us. First, let's show a "Thank You" message to them.

In the `assets` folder you'll see two PNGs: `intro.png` and `introthanks.png`:

![Intro image](../img/part5/9-intro.png)
![Intro image](../img/part5/10-introthanks.png)

We will edit the code to display the correct one, based on the status of the API.

Back inside the `Intro.js` file, scroll down to inside the `create` method where the `intro` image is added:

```js
const intro = this.add.image(x, 240, 'intro');
```

We're going to use the plugins `START` event to change this texture. We have already loaded all the images required, so all we need is an event listener and to act on it accordingly:

```javascript
const intro = this.add.image(x, 240, 'intro');

// Plugin here
gamewebmonetization.on("start", () => {
    intro.setTexture('introthanks');
});
```

Let's go back to our game and see what happens:

![Change intro thanks](../img/part5/11-change_intro_thanks.gif)

When the event fires, the intro texture is changed to the "Thank You!" version. Now let's give them a choice of backgrounds.

### Changing to the Premium Background

When you go to the Main Menu in the game you'll see two buttons at the bottom. These allow the player to toggle between the Standard and Premium backgrounds. Only if they are Web Monetized can they pick the Premium background. If they aren't, we'll show them an alert message instead.

You may remember from Part 3 of the tutorial that the plugin offers a boolean property called `isMonetized`. We can read this to know if we should enable both buttons for the player, or not.


The funds exchange system is already fully implemented, if you look if you go to the **Menu.js** file you will see that inside **init ()** you have a variable called **this.isMonetized = false** and If you analyze what it does a little further down, you will see that it helps us to manage the background thanks to **background_selected.active** that is declared in **global_var.js** once one button or another is pressed, the background will be changed active and it will be set to normal or premium and thanks to this then **BackgroundScene.js** will automatically know which background to use.

Well, inside **Menu.js** we are only going to use the **.isMonetized** method, so remember to import the instance of our plugin:

```javascript
import { background_selected, gamewebmonetization } from "../global_vars.js";
```

So assign **this.isMonetized** to gamewebmonetization.isMonetized and automatically if you change the state of the button you will see that it will let you change the background and you can play with the funds you want, your code should be like this:

![Change background to premium](../img/part5/12-menu_background_premium.png)

Now if you try to play again, you will see that you already have the option to change the background.

![Change background gif](../img/part5/13-premium_background.gif)

### Vidas extras

Now finally we are going to make the user have an exclusive extra life, go to the main scene **MainScene.js** and if you look closely we also have the variable called **this.isMonetized** but if you go down to the create method you will see this line:

```javascript
        // Lifes
        this.lifes = new Lifes(this, this.isMonetized);
```

En la instanciación de las vidas si te fijas le estamos pasando **this.isMonetized**, acá perfectamente podríamos poner true o false, juega un poco con eso y prueba el juego, pero recuerda dejar **this.isMonetized** como estaba antes.

Let's go to the **init ()** method and reassign **this.isMonetized** as we did with the **Menu**, remember to import **gamewebmonetization**, it should look like this:

![Extra life is monetized](../img/part5/14-extra_life_ismonetized.png)

If you start the game you will see that now you will have 3 lives and one of them is gold, therefore it is the extra life that we give to the user.

![Extra life gif](../img/part5/15-extra_life.gif)

As you have seen there are many possibilities when it comes to using the monetization plugin and as we have mentioned before it all depends on what you want to give the user.
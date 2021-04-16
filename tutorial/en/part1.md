---
title: What is Web Monetization?
subtitle: Part 1 - Qué es Web Monetization?
date: 
author: Richard Davey
twitter: photonstorm
---

# What is Web Monetization?

![Logo Web Monetization](../img/part1/logo-web-monetization.svg)

Web Monetization is a JavaScript browser API that allow creators to monetize their content by creating a constant payment stream.

### How does it work?

The user registers with a provider such as Coil, pays a fixed amount per month and thanks to an extension that is installed in the browser (or a browser with the system already integrated), the user can support the content they are enjoying. Don't worry, the payments are made automatically and you just have to initialize the plugin with everything configurated, we'll see that later.

### ¿Dónde va el dinero que envía el proveedor?

In order to obtain the micropayments it is necessary to have a wallet (you can see witch wallets available in the following link [here](https://webmonetization.org/#wallets:~:text=Web%20Monetization%20Wallets)).

Thanks to the wallet you can generate a single payment point through Interledger protocol which is what allows us to have a constant flow of micropayments.

The user accesses your site or game, the plugin with your payment pointer configured detects that it has the Coil (or provider) extension and that it has a balance, and then begins to generate the micro payment to the developer, at this point the developer decides what benefits to give to the user and then the money will arrive in your wallet automatically.

### What benefits to give the user?

Each developer can decide what benefits to give the user, for example you can make your game not have more ads or give more lives or something that helps the user in the game.

Web Monetization is not intended to replace the way you make money you can see it as one more addition, something that if you add it you can generate more income in exchange for giving a benefit to the player, it is a win to win.

To familiarize yourself with the concepts, I invite you to visit the [Coil provider page](https://coil.com/) and the [Web Monetization page](https://webmonetization.org/).

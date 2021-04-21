---
title: Web Monetization for Games
subtitle: Part 1 - What is Web Monetization?
date: 
author: Richard Davey
twitter: photonstorm
---

# What is Web Monetization?

![Logo Web Monetization](../img/part1/logo-web-monetization.svg)

At its heart, Web Monetization is a JavaScript browser API that allows game developers to monetize their games by creating a constant payment stream. As players play, micropayments are sent to your wallet. It is also being proposed as a W3C standard. The aim is to solve a common issue:

"The ability to transfer money has been a long-standing omission from the web platform. As a result, the web suffers from a flood of advertising and corrupt business models. Web Monetization provides an open, native, efficient, and automatic way to compensate creators.

Until recently, there hasn't been an open, neutral protocol for transferring money. Interledger provides a simple, ledger-agnostic, and currency-agnostic method for the transfer of small quantities of money. This opens up the possibility for streaming money, which makes Web Monetization possible for the first time."

## How does it work?

Users register with a Web Monetization provider such as [Coil](https://coil.com). After signing-up they can pay a small fixed amount per month, and thanks to the Coil browser extension, or by using a browser that natively supports Web Monetization, the users automatically support the content they are enjoying.

This happens because you can easily initialize the Game Web Monetization Plugin directly from your games, making the process fully automatic for both you and your players. With the plugin running, micropayments are streamed directly to your wallet, for the duration the players are enjoying your game. You can detect if this this is happening in your game code, allowing you to offer extra or exclusive content to those who are supporting you.

## How to receive micropayments

In order for your games to receive micropayments it is necessary to have a wallet. You can see a list of all Web Monetization compatible wallets [here](https://webmonetization.org/#wallets:~:text=Web%20Monetization%20Wallets)).

Using the wallet you can generate a single Payment Point using the Interledger protocol. This is what enables the constant flow of micropayments while someone is playing your game.

Your Web Monetized game is configured to use this Payment Point via the plugin, which we'll cover later in this tutorial. If the plugin detects that the player has the Coil extension, or is using a supported browser, then it begins to generate the micropayment to you. At this point you will receive event notifications from the plugin and can decide what benefits to give them, knowing full well that the money is being streamed directly to your wallet at that moment, and all without annoying the user with an In App Purchase window or credit card form.

## What benefits can you give players?

It's up to you to decide what benefits you give your micropaying players. For example you could chose not to display any advertisements or pre-roll videos to them. Or, you could give them a game-specific bonus, such as extra power-ups, additional characters or exclusive levels. It's entirely up to you.

Web Monetization is not intended to replace _all_ of the ways your games can make money. For example, perhaps your game offers a subscription service, or sells game enhancements. You can still do this. However, Web Monetization offers a much more player-friendly alternative to bombarding them with advertisements, for example. There's no need to interrupt your game with videos and ruin the flow as you know you're already being paid.

We strongly suggest you familiarize yourself with the core concepts by reading over the [Coil provider page](https://coil.com/) and the [Web Monetization page](https://webmonetization.org/). 

Then let's get started implementing the Game Web Monetization Plugin in Part 2.

import { GameWebMonetization } from './GameWebMonetization.js';

var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

gameWebMonetization.start();

gameWebMonetization.on(GameWebMonetization.START, (receive) => {
    // Here your code
    console.log(recieve);
});
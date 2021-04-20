import { GameWebMonetization } from './GameWebMonetization.js';

var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
gameWebMonetization.on(GameWebMonetization.START, (e) => {
    console.log('Start monetization')
    console.log(gameWebMonetization.total)
    console.log(e)
});


console.log(GameWebMonetization.START)

setTimeout(() => {
    gameWebMonetization.start();
}, 2000);

// setTimeout(() => {
//     gameWebMonetization.stop();
// }, 5000);


// setTimeout(() => {
//     gameWebMonetization.start();
// }, 10000);
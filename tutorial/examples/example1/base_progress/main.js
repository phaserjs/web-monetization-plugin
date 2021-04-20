import { GameWebMonetization } from './GameWebMonetization.js';

const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
gameWebMonetization.on(GameWebMonetization.START, (e) => {
    console.log('Start monetization')
    console.log(gameWebMonetization.total)
    console.log(e)
});


gameWebMonetization.start();

setTimeout(() => {
    gameWebMonetization.stop();
}, 5000);


setTimeout(() => {
    gameWebMonetization.start();
}, 10000);
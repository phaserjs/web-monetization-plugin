import { GameWebMonetization } from './GameWebMonetization.js';

var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

console.log('The state: ', gameWebMonetization.state);

gameWebMonetization.start();

gameWebMonetization.on(GameWebMonetization.PENDING, (receive) => {
    // Here your code
    console.log('[inside event pending] - The state: ', gameWebMonetization.state);
});



gameWebMonetization.on(GameWebMonetization.START, (receive) => {
    // Here your code
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});

gameWebMonetization.on(GameWebMonetization.PROGRESS, (receive) => {
    // Here your code
    console.log('Progress: ', receive);
});

gameWebMonetization.on(GameWebMonetization.STOP, (receive) => {
    // Here your code
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});

setTimeout(() => {
    gameWebMonetization.stop();
}, 5000);
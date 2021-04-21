import { GameWebMonetization } from './GameWebMonetization.js';

const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii',
    weight: 60,
    pointerName: "Bob"
});

gameWebMonetization.changePaymentPointer({
    paymentPointer: '$ilp.uphold.com/ziW6E7iwKUkp',
    weight: 40,
    pointerName: "Alice"
});

console.log('The state: ', gameWebMonetization.state);

gameWebMonetization.start();

gameWebMonetization.on(GameWebMonetization.PENDING, (event) => {
    console.log('[inside event pending] - The state: ', gameWebMonetization.state);
});

gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log('[inside event start] - The state: ', gameWebMonetization.pointer);
});

gameWebMonetization.on(GameWebMonetization.PROGRESS, (event) => {
    // Here your code
    console.log('Progress: ', event);
});

gameWebMonetization.on(GameWebMonetization.STOP, (event) => {
    // Here your code
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});

setTimeout(() => {
    gameWebMonetization.stop();
}, 5000);
import { CONFIG } from './config.js';
import { webmonetization } from './global_vars.js';

const stopbutton = document.querySelector('#stop');

stopbutton.addEventListener('click', () => {
    webmonetization.stop();
});

const startbutton = document.querySelector('#start');

startbutton.addEventListener('click', () => {
    webmonetization.start();
});

const game = new Phaser.Game(CONFIG);

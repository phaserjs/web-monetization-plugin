import { CONFIG } from './config.js';
import { webmonetization } from './global_vars.js';

webmonetization.start();

const stopbutton = document.querySelector('#stop');
stopbutton.addEventListener('click', () => {
    webmonetization.stop();
});

const startbutton = document.querySelector('#start');
startbutton.addEventListener('click', () => {
    webmonetization.start();
});

const game = new Phaser.Game(CONFIG);

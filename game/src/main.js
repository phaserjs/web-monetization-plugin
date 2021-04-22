import { CONFIG } from './config.js';
import { gamewebmonetization } from './global_vars.js';

const stopbutton = document.querySelector('#stop');

stopbutton.addEventListener('click', () => {
    gamewebmonetization.stop();
});

const startbutton = document.querySelector('#start');

startbutton.addEventListener('click', () => {
    gamewebmonetization.start();
});

const game = new Phaser.Game(CONFIG);

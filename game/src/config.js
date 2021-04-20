import { BackgroundScene } from './scenes/BackgroundScene.js';
import { Bootloader } from './Bootloader.js';
import { Intro } from './scenes/Intro.js';
import { MainScene } from './scenes/MainScene.js';
import { Menu } from './scenes/Menu.js';

export const CONFIG = {
    title: '3Candies',
    version: '1.0.0',
    type: Phaser.AUTO,
    backgroundColor: '#1e272e',
    disableContextMenu: false,
    scale: {
        parent: 'game',
        width: 450,
        height: 450,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true,
    },
    scene: [
        Bootloader,
        Intro,
        BackgroundScene,
        MainScene,
        Menu,
    ]
};

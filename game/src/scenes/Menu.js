import { background_selected, webmonetization } from "../global_vars.js";

export class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    init() {
        this.popfx = this.sound.add('pop');
        this.cameras.main.fadeIn(600, 0, 0, 0);
    }

    create() {
        const background = this.add.image(0, 0, 'backgroundstart')
            .setAlpha(.8)
            .setOrigin(0);

        const logo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 50, '3candies')
            .setScale(0);

        this.tweens.add({
            targets: logo,
            duration: 800,
            ease: Phaser.Math.Easing.Bounce.Out,
            scale: 1.8
        });
        this.buttons();
    }

    buttons() {
        // click to start
        const text_start = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 40,
            'pixel2Border',
            'CLICK TO START',
            22,
            1)
            .setOrigin(.5)
            .setTint(0xf1c40f)
            .setDepth(100);
       
        this.tweens.add({
            targets: [text_start],
            alpha: 0,
            duration: 500,
            ease: (e) => Math.round(e),
            repeat: -1,
            yoyo: -1
        });

        // Select backgrounds
        const text_change_background = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2,
            this.sys.game.config.height - 150,
            'pixel2',
            'CHOOSE BACKGROUND',
            8)
            .setOrigin(.5);

        const normal_background_button = this.add.image(this.sys.game.config.width / 2 - 45, this.sys.game.config.height - 100, 'normal_background-button-selected2')
            .setInteractive({
                'cursor': 'pointer'
            })
            .setData({
                'active': true
            })
            .setName('background_buttons-normal');

        const premium_background_button = this.add.image(this.sys.game.config.width / 2 + 45, this.sys.game.config.height - 100, 'premium_background-button')
            .setInteractive({
                'cursor': 'pointer'
            })
            .setData({
                'active': false,
                'plugin-active': webmonetization.isMonetized
            })
            .setAlpha(
                webmonetization.isMonetized ? 1 : .6
            )
            .setName('background_buttons-premium');

        normal_background_button.on(Phaser.Input.Events.POINTER_OVER, () => {
            if(!normal_background_button.getData('active')) {
                normal_background_button.setTexture('normal_background-button-hover');
            }
        });
        normal_background_button.on(Phaser.Input.Events.POINTER_OUT, () => {
            if(!normal_background_button.getData('active')) {
                normal_background_button.setTexture('normal_background-button');
            }
        });

        premium_background_button.on(Phaser.Input.Events.POINTER_OVER, () => {
            if(!premium_background_button.getData('active')) {
                premium_background_button.setTexture('premium_background-button-hover');
            }
        });
        premium_background_button.on(Phaser.Input.Events.POINTER_OUT, () => {
            if(!premium_background_button.getData('active')) {
                premium_background_button.setTexture('premium_background-button');
            }
        });

        // Click to start
        this.input.on(Phaser.Input.Events.POINTER_DOWN, (Pointer, GameObject) => {
            // If is background selector doesn't change scene
            const gameobject = GameObject[0];
            if (gameobject === undefined) {
                this.startGame();
            } else {
                if (gameobject.name.startsWith('background_buttons')) {
                    if (gameobject.name.endsWith('normal')) {
                        this.popfx.play();
                        background_selected.active = "normal";
                        gameobject.setData({'active': true});
                        gameobject.setTexture('normal_background-button-selected');
                        premium_background_button.setTexture('premium_background-button');
                        premium_background_button.setData({'active': false});
                    }
                    if (gameobject.name.endsWith('premium')) {
                        if(gameobject.getData('plugin-active')) {
                            this.popfx.play();
                            background_selected.active = "premium";
                            gameobject.setData({'active': true});
                            gameobject.setTexture('premium_background-button-selected');
                            normal_background_button.setTexture('normal_background-button');
                            normal_background_button.setData({'active': false});
                        } else {
                            alert('You need the plugin!');
                        }
                    }
                }
            }

        })
    }

    startGame() {
        // Launch background-scene
        this.scene.launch('BackgroundScene');
        this.scene.start('MainScene', { is_from_restart: false });

    }
}
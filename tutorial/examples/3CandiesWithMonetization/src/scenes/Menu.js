import { background_selected, gamewebmonetization } from "../global_vars.js";

export class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    init ()
    {
        this.popfx = this.sound.add('pop');
        this.cameras.main.fadeIn(600, 0, 0, 0);

        this.isMonetized = gamewebmonetization.isMonetized;
    }

    create ()
    {
        const x = this.scale.width / 2;

        this.background = this.add.tileSprite(0, 0, 520, 700, 'backgroundstart').setOrigin(0);

        this.tori1 = this.add.image(300, 300, 'tori1');
        this.tori2 = this.add.image(300, 300, 'tori2').setAlpha(0);

        this.logo = this.add.image(x, 60, '3candies').setScale(0);

        this.tweens.add({
            targets: this.logo,
            duration: 800,
            ease: Phaser.Math.Easing.Bounce.Out,
            scale: 1.8
        });

        this.buttons();
    }

    update ()
    {
        this.background.tilePositionX += 0.2;
        this.background.tilePositionY += 0.3;
    }

    buttons ()
    {
        const x = this.scale.width / 2;
        const y = this.scale.height / 2;

        // click to start
        const text_start = this.add.dynamicBitmapText(
            x,
            y + 40,
            'pixel2Border',
            'CLICK TO START',
            22,
            1)
            .setOrigin(.5)
            .setTint(0xf1c40f)
       
        this.tweens.add({
            targets: [ text_start ],
            alpha: 0,
            duration: 500,
            ease: (e) => Math.round(e),
            repeat: -1,
            yoyo: -1
        });

        // Select backgrounds
        const text_change_background = this.add.dynamicBitmapText(
            x,
            this.scale.height - 150,
            'pixel2',
            'CHOOSE BACKGROUND',
            8)
            .setOrigin(.5);

        const normal_background_button = this.add.image(x - 45, this.scale.height - 100, 'normal_background-button-selected2')
            .setInteractive({
                'cursor': 'pointer'
            })
            .setData({
                'active': true
            })
            .setName('background_buttons-normal');

        const premium_background_button = this.add.image(x + 45, this.scale.height - 100, 'premium_background-button')
            .setInteractive({
                'cursor': 'pointer'
            })
            .setData({
                'active': false,
                'plugin_active': this.isMonetized
            })
            .setAlpha(
                this.isMonetized ? 1 : .6
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
                        if(gameobject.getData('plugin_active')) {
                            this.popfx.play();
                            background_selected.active = "premium";
                            gameobject.setData({'active': true});
                            gameobject.setTexture('premium_background-button-selected');
                            normal_background_button.setTexture('normal_background-button');
                            normal_background_button.setData({'active': false});
                        } else {
                            alert('Coil extension is needed!');
                        }
                    }
                }
            }

         })
    }

    startGame ()
    {
        this.tweens.add({
            targets: this.logo,
            duration: 2000,
            ease: Phaser.Math.Easing.Bounce.Out,
            scale: 0,
            onComplete: () => {
                // Launch background-scene
                this.scene.launch('BackgroundScene');
                this.scene.start('MainScene', { is_from_restart: false });
            }
        });

        this.tori1.setAlpha(0);
        this.tori2.setAlpha(1);
    }
}
import { background_selected, gamewebmonetization } from "../global_vars.js";

export class Menu extends Phaser.Scene
{
    constructor ()
    {
        super('Menu');
    }

    init ()
    {
        this.popfx = this.sound.add('pop');
    }

    create ()
    {
        const x = this.scale.width / 2;

        this.background = this.add.tileSprite(0, 0, 520, 700, 'backgroundstart').setOrigin(0);

        this.tori1 = this.add.image(300, 300, 'tori1');
        this.tori2 = this.add.image(300, 300, 'tori2').setAlpha(0);

        this.logo = this.add.image(x, 60, '3candies').setScale(0);

        const startText = this.add.bitmapText(x, 265, 'pixel2Border', 'CLICK TO START', 22, 1);
        const backgroundText = this.add.bitmapText(x, 300, 'pixel2', 'CHOOSE BACKGROUND', 8);

        startText.setOrigin(0.5).setTint(0xf1c40f);
        backgroundText.setOrigin(0.5).setDropShadow(1, 1, 0x000000, 1);

        this.isPremium = false;

        const normalBackgroundButton = this.add.image(x - 45, 350, 'normal_background-button-selected');
        const premiumBackgroundButton = this.add.image(x + 45, 350, 'premium_background-button');

        normalBackgroundButton.setInteractive({ useHandCursor: true });
        premiumBackgroundButton.setInteractive({ useHandCursor: true });

        if (!gamewebmonetization.isMonetized)
        {
            premiumBackgroundButton.setAlpha(0.9);
        }

        //  Button Handlers

        normalBackgroundButton.on('pointerover', () => {

            if (this.isPremium)
            {
                normalBackgroundButton.setTexture('normal_background-button-hover');
            }

        });

        normalBackgroundButton.on('pointerout', () => {

            if (this.isPremium)
            {
                normalBackgroundButton.setTexture('normal_background-button');
            }

        });

        normalBackgroundButton.on('pointerdown', (pointer, x, y, event) => {

            this.popfx.play();

            this.isPremium = false;

            normalBackgroundButton.setTexture('normal_background-button-selected');
            premiumBackgroundButton.setTexture('premium_background-button');

            event.stopPropagation();

        });

        premiumBackgroundButton.on('pointerover', () => {

            if (!this.isPremium)
            {
                premiumBackgroundButton.setTexture('premium_background-button-hover');
            }

        });

        premiumBackgroundButton.on('pointerout', () => {

            if (!this.isPremium)
            {
                premiumBackgroundButton.setTexture('premium_background-button');
            }

        });

        premiumBackgroundButton.on('pointerdown', (pointer, x, y, event) => {

            this.popfx.play();

            if (gamewebmonetization.isMonetized)
            {
                this.isPremium = true;

                normalBackgroundButton.setTexture('normal_background-button');
                premiumBackgroundButton.setTexture('premium_background-button-selected');
            }
            else
            {
                alert('You need the plugin!');
            }

            event.stopPropagation();

        });

        this.input.once('pointerdown', this.startGame, this);

        //  Tweens and Camera fade

        this.tweens.add({
            targets: this.logo,
            duration: 800,
            ease: Phaser.Math.Easing.Bounce.Out,
            scale: 1.8
        });

        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 0,
            repeat: -1,
            hold: 800,
            repeatDelay: 2000
        });

        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update ()
    {
        this.background.tilePositionX += 0.2;
        this.background.tilePositionY += 0.3;
    }

    startGame ()
    {
        background_selected.active = (this.isPremium) ? 'premium' : 'normal';
 
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
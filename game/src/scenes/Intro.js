import { gamewebmonetization } from "../global_vars.js";

export class Intro extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: 'Intro'
        });
    }

    init ()
    {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.changingScene = true;

        const music = this.sound.add('candySong1', {
            loop: true,
            volume: 0
        });

        music.play();

        this.tweens.add({
            targets: music,
            volume: 0.5,
            duration: 3000
        });

        this.game.events.on('volumedown_mainsong', () =>
        {
            music.setVolume(0.1);
        });

        this.game.events.on('volumeup_mainsong', () =>
        {
            music.setVolume(0.5);
        });
    }

    create ()
    {
        this.background = this.add.tileSprite(0, 0, 520, 700, 'backgroundstart').setOrigin(0);

        const x = this.scale.width / 2;

        for (let i = 0; i < 8; i++)
        {
            const logo = this.add.image(x, 80, 'webmonetization');

            logo.setScale(2);
    
            this.tweens.add({
                targets: logo,
                duration: 1000,
                scaleX: -2,
                yoyo: true,
                repeat: -1,
                delay: i * 10,
            });
        }

        const intro = this.add.image(x, 240, 'intro');

        gamewebmonetization.once('start', () => {

            intro.setTexture('introthanks');

        });

        gamewebmonetization.start();

        const playButton = this.add.image(x, 380, 'playbutton');

        playButton.setInteractive({ cursor: 'pointer' });

        playButton.on(Phaser.Input.Events.POINTER_OVER, () =>
        {
            playButton.setTint(0x95d2d6);
        });

        playButton.on(Phaser.Input.Events.POINTER_OUT, () =>
        {
            playButton.clearTint();
        });

        playButton.on(Phaser.Input.Events.POINTER_DOWN, () =>
        {
            if (this.changingScene)
            {
                this.changingScene = false;
         
                this.cameras.main.fadeOut(500, 0, 0, 0);

                this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
                {
                    this.scene.start('Menu');
                });
            }
        });
    }

    update ()
    {
        this.background.tilePositionX += 0.2;
        this.background.tilePositionY += 0.3;
    }
}
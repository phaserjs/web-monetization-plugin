export class Intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'Intro'
        });
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.change_scene = true;

        const CandySong = this.sound.add('candySong1', {
            loop: true,
            volume: 0
        });
        CandySong.play();

        this.tweens.add({
            targets: CandySong,
            volume: .5,
            duration: 3000
        });

        this.game.events.on('volumedown_mainsong', () => {
            CandySong.setVolume(.1);
        });

        this.game.events.on('volumeup_mainsong', () => {
            CandySong.setVolume(.5);
        });
    }

    create() {

        const logo_webmonetization = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 80, 'webmonetization')
            .setAlpha(0)
            .setScale(2);
        this.tweens.add({
            targets: logo_webmonetization,
            duration: 1000,
            alpha: 1
        });

        // Thanks
        this.webmonetization_text = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            'pixel2',
            `This game uses the Web Monetization Plugin`,
            8,
            1)
            .setTint(0x6ADAAB)
            .setOrigin(0.5);

        this.webmonetization_text = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 30,
            'pixel2',
            `If you activate the plugin
you will get an exclusive background
and extra lives
`,
            8)
            .setCenterAlign()
            .setOrigin(0.5);

        this.webmonetization_text = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 60,
            'pixel2',
            `Thank you for supporting us`,
            8)
            .setTint('0xe67e22')
            .setCenterAlign()
            .setOrigin(0.5);

        const play_button = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height - 100, 'playbutton');
        play_button.setAlpha(.2);

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.tweens.add({
                    targets: play_button,
                    alpha: 1,
                    onComplete: () => {
                        play_button.setInteractive({
                            cursor: 'pointer'
                        });
                    }
                });
            }
        });

        play_button.on(Phaser.Input.Events.POINTER_OVER, () => {
            play_button.setTint(0x95d2d6);
        });
        play_button.on(Phaser.Input.Events.POINTER_OUT, () => {
            play_button.clearTint();
        });

        play_button.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.change_scene) {
                this.change_scene = false;
                this.cameras.main.fadeOut(500, 0, 0, 0);

                this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.start('Menu');
                });
            }
        });

    }
}
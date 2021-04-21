import { backgrounds, candies, lifes_sprites, webmonetization } from "./global_vars.js";

export class Bootloader extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: 'Bootloader'
        });
    }

    preload ()
    {
        this.load.setPath('src/assets/');

        this.load.image('candy-container-0');
        this.load.image('candy-container-1');

        this.load.image('gameover');
        this.load.image('playbutton');
        this.load.image('intro');
        this.load.image('introthanks');
        this.load.image('tori1');
        this.load.image('tori2');

        //#region AUDIO LOAD
        this.load.setPath('src/assets/audio');
        this.load.audio('candySong1', ['/candy_2.mp3']);
        this.load.audio('pop', ['/POP.mp3']);
        this.load.audio('wrong', ['/wrong.mp3']);
        this.load.audio('correct', ['/correct.mp3']);
        this.load.audio('woosh', ['/woosh_2.mp3']);
        this.load.audio('tick', ['/tick.mp3']);
        this.load.audio('tada', ['/tada.mp3']);
        this.load.audio('searchsound', ['/search_sound.mp3']);
        this.load.audio('marimba', ['/marimba.mp3']);
        this.load.audio('marimba_reverse', ['/marimba_reverse.mp3']);
        //#endregion

        //#region LOGO
        this.load.setPath('src/assets/logos/');
        this.load.image('3candies');
        this.load.image('webmonetization');
        //#endregion

        this.load.setPath('src/assets/buttons/backgrounds_selector/');
        this.load.image('normal_background-button');
        this.load.image('normal_background-button-hover');
        this.load.image('normal_background-button-selected');
        this.load.image('normal_background-button-selected2');

        this.load.image('premium_background-button');
        this.load.image('premium_background-button-hover');
        this.load.image('premium_background-button-selected');

        this.load.setPath('src/assets/backgrounds/');
        backgrounds.forEach(background => {
            this.load.image(background);
        });
        this.load.image('backgroundstart');

        this.load.setPath('src/assets/candies/');
        candies.forEach(candy => {
            this.load.image(candy);
        });
        this.load.image('random-candy');

        this.load.setPath('src/assets/lifes/');
        lifes_sprites.forEach(life => {
            this.load.image(life);
        });

        // Confetis
        this.load.setPath('src/assets/confetis/');
        this.load.atlas('confetis', 'confetis.png', 'confetis_atlas.json');

        // Load fonts
        this.load.setPath('src/assets/fonts/');
        this.load.json('fontBordersJSON', 'border/fontBorders.json');
        this.load.image('fontBorders', 'border/fontBorders.png');

        this.load.setPath('src/assets/fonts/');
        this.load.json('fontJSON', 'normal/font.json');
        this.load.image('font', 'normal/font.png');
    }

    create ()
    {
        const fontBordersJSON = this.cache.json.get('fontBordersJSON');
        this.cache.bitmapFont.add('pixel2Border', Phaser.GameObjects.RetroFont.Parse(this, fontBordersJSON));

        const fontJSON = this.cache.json.get('fontJSON');
        this.cache.bitmapFont.add('pixel2', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

        this.scene.start('Intro');
        // this.scene.start('Menu');
        // this.scene.start('MainScene');
    }
}

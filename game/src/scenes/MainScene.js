import { candy_grid, count_down, minimun_to_search, gamewebmonetization } from '../global_vars.js';

import { constructorConfeti as Confetis } from '../GameObjects/Confetis.js';
import { GetName } from '../helpers/GetName.js';
import { Lifes } from '../GameObjects/Lifes.js';
import { RandomButtom } from '../GameObjects/RandomButtom.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainScene'
        });
        this.color_to_search = '';
    }

    init({ is_from_restart }) {
        if (!is_from_restart) {
            this.cameras.main.fadeIn(1000, 0, 0, 0);
            this.color_to_search = '';
        }

        //#region SOUNDS
        this.popfx = this.sound.add('pop', { volume: .4 });
        this.wrongfx = this.sound.add('wrong');
        this.correctfx = this.sound.add('correct');
        this.tickfx = this.sound.add('tick', { volume: .5 });
        this.tadafx = this.sound.add('tada');
        this.searchsoundfx = this.sound.add('searchsound');
        //#endregion

        // Pairs pieces GameObjects
        this.three_search = [];

        this.points = 0;
        this.bonus_points = 1;

        // Timer game
        this.count_down = 1000 * count_down;
        this.remain_time = 0;
        this.rounds = 0;

        candy_grid.reset();

        // Grid Logic Objects
        this.grid = candy_grid;
        this.grid.setScene(this);

        // Confetis
        this.confetis = new Confetis(this);

        gamewebmonetization.on('stop', () => {
            // this.scene.stop('BackgroundScene');
            // this.scene.stop('Menu');
            // this.scene.stop();
            // this.scene.start('Intro');
            gamewebmonetization.removeListener('stop');
            gamewebmonetization.removeListener('start');
            this.sound.stopAll();
        });

        gamewebmonetization.on('start', () => {
            this.lifes.addLifes(true);
        });
    }

    create() {
        // Lifes
        this.lifes = new Lifes(this, gamewebmonetization.isMonetized);

        // Candies box container
        this.candies_box = this.add.image(this.scale.width / 2, this.scale.height / 2, 'candy-container-0');
        this.candies_box_bottom = this.add.image(this.scale.width / 2, this.scale.height / 2, 'candy-container-1').setDepth(1000);

        /*
        ## Text
        */
        this.timer_label = this.add.dynamicBitmapText(12, 75, 'pixel2Border', 'Time', 20, 0);
        this.timer_text = this.add.dynamicBitmapText(35, 95, 'pixel2Border', 0, 40, 1)
            .setTint(0x9b59b6)
            .setDepth(100);

        // Score Text
        this.score = this.add.dynamicBitmapText(
            this.sys.game.config.width - 110, 15,
            'pixel2',
            Phaser.Utils.String.Pad(0, 6, '0', 1),
            16
        );

        this.bonus_text = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 80,
            'pixel2Border',
            'BONUSX2',
            24
        )
            .setTint(0x575fcf)
            .setAlpha(0)
            .setOrigin(.5)
            .setScale(0)
            .setDepth(2001);

        // positive reinforcement text
        this.positive_reinforcement = this.add.dynamicBitmapText(
            this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 40,
            'pixel2Border',
            '',
            32
        )
            .setTint(0xFC427B)
            .setAlpha(0)
            .setOrigin(.5)
            .setScale(0)
            .setDepth(2001);

        // GameOver overlay (box top)
        this.gameover_overlay = this.add.image(this.candies_box.x, -150, 'gameover')
            .setDepth(2000);

        this.play_button = this.add.image((this.gameover_overlay.x), (this.gameover_overlay.y + 73), 'playbutton')
            .setInteractive({ "cursor": "pointer" })
            .setDepth(2002)
            .setData({ "change-scene": true });

        this.play_button.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.play_button.setTint(0x95d2d6);
        });

        this.play_button.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.play_button.clearTint();
        });

        this.play_button.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.play_button.getData("change-scene")) {
                this.play_button.setData({ "change-scene": false });
                // Remove cap
                this.tweens.add({
                    targets: [this.gameover_overlay, this.play_button],
                    delay: 500,
                    y: -200,
                    duration: 500,
                    onComplete: () => {
                        this.scene.restart({ is_from_restart: true });
                    }
                });
            }
        }, this);

        this.random_buttom = new RandomButtom({
            scene: this,
            texture: 'random-candy',
            x: this.sys.game.config.width / 2 + 110,
            y: this.sys.game.config.height - 50
        });

        this.random_buttom_label = this.add.dynamicBitmapText(
            200,
            this.sys.game.config.height - 50,
            'pixel2',
            'Find 3 candies',
            16
        )
            .setDepth(2002)
            .setOrigin(.5);

        this.random_buttom.on('stopped', (color) => {
            this.searchsoundfx.play();
            this.color_to_search = color;
            this.timer = this.time.addEvent({
                delay: this.count_down - 1000,
                callback: () => {
                    // Call Damage
                    if (this.three_search.length < minimun_to_search) {
                        this.damage();
                    }
                }
            });
        });

        this.events.on('grid-complete', (candy_to_search) => {
            this.random_buttom.launchDice(candy_to_search);

        });

        // Candy grid creator
        const initial_candy_position = {
            x: this.candies_box.x - (this.candies_box.width / 2) + 10,
            y: this.candies_box.y - (this.candies_box.height / 2) + 14
        };
        this.grid.setPosition(initial_candy_position);
        this.grid.createStartGrid();

        // First time to start the scene
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if (pointer.button > 0) return true;
            const name = gameObject.name;
            if (
                this.random_buttom.isRandomActive() &&
                this.color_to_search !== '' &&
                this.three_search.length < minimun_to_search
            ) {
                if (this.color_to_search === GetName(name)) {
                    //#region Collect pice (all is fine)
                    this.popfx.play();
                    // Push inside three_search
                    this.three_search.push(gameObject);

                    gameObject.removeInteractive()
                    this.tweens.add({
                        targets: [gameObject],
                        ease: Phaser.Math.Easing.Bounce.Out,
                        scale: 0,
                        onComplete: () => {
                            if (this.three_search.length >= minimun_to_search) {
                                this.rounds++;
                                if ((this.rounds % 4) === 0) {
                                    this.count_down = this.count_down - 200;
                                }

                                this.correctfx.play();

                                this.positiveReinforcement(this.timer.getElapsed());

                                this.timer.remove();
                                this.timer.destroy();
                                this.timer = undefined;

                                // WIN POINTS
                                this.points += Math.round(100 * this.bonus_points);

                                this.bonus_points = 1;
                                this.score.setText(
                                    Phaser.Utils.String.Pad(this.points, 6, 0, 1)
                                );

                                // Recreate the grid: 
                                this.grid.createNewGrid();

                                this.color_to_search = '';
                                this.three_search = [];
                            }
                        }
                    });
                    //#endregion
                } else {
                    this.damage();

                }

            }
        });
    }

    positiveReinforcement(time) {
        const remain_time = time / 1000;
        let show_text = false;

        if (remain_time < 3.0 && remain_time > 2) {
            show_text = true;
            // Great
            this.positive_reinforcement.setText('GREAT');
            this.bonus_points = 2;
        } else if (remain_time < 2 && remain_time > 1.5) {
            show_text = true;
            this.positive_reinforcement.setText('WONDERFUL')
            this.bonus_points = 3;
        } else if (remain_time < 1.5) {
            show_text = true;
            this.positive_reinforcement.setText('AMAZING')
            this.bonus_points = 5;
        } else {
            show_text = false;
        }

        if (show_text) {
            this.bonus_text.setText(`BONUSX${this.bonus_points}`);
            this.tweens.add({
                targets: [this.bonus_text],
                duration: 900,
                ease: Phaser.Math.Easing.Bounce.Out,
                scale: 1,
                alpha: 1,
                y: this.sys.game.config.height / 2 + 40,
                onComplete: () => {
                    this.tweens.add({
                        targets: [this.bonus_text],
                        scale: 0,
                        duration: 200,
                        delay: 500,
                        y: this.sys.game.config.height / 2 + 80,
                        alpha: 0
                    });
                }
            });
            this.tweens.add({
                targets: [this.positive_reinforcement],
                duration: 900,
                ease: Phaser.Math.Easing.Bounce.Out,
                scale: 1,
                alpha: 1,
                y: this.sys.game.config.height / 2,
                onComplete: () => {
                    this.tweens.add({
                        targets: [this.positive_reinforcement],
                        scale: 0,
                        duration: 200,
                        delay: 500,
                        y: this.sys.game.config.height / 2 + 40,
                        alpha: 0
                    });
                }
            });
        }
    }

    damage() {
        this.wrongfx.play();

        this.timer.remove();
        this.timer.destroy();
        this.timer = undefined;
        this.remain_time = 0;

        this.color_to_search = '';
        this.three_search = [];

        // Rest lifes
        this.lifes.removeLife();

        // Camera shake
        this.cameras.main.shake(250, .01);

        if (this.lifes.getLifes() === 0) {
            this.gameover();
        }

        else {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    // Recreate the grid: 
                    this.grid.createNewGrid();
                }
            });
        }
    }

    gameover() {
        this.game.events.emit('volumedown_mainsong');
        this.tadafx.play();
        this.tadafx.on(Phaser.Sound.Events.COMPLETE, () => {
            this.game.events.emit('volumeup_mainsong');
        });

        // GameOver :(
        this.confetis.launch();

        this.random_buttom_label.setVisible(false);
        this.random_buttom.setVisible(false);

        this.tweens.add({
            targets: [this.gameover_overlay_label],
            ease: Phaser.Math.Easing.Bounce.Out,
            y: this.candies_box.y - 14 - 93,
            delay: 1000,
            duration: 1500,

        });
        this.tweens.add({
            targets: [this.gameover_overlay],
            ease: Phaser.Math.Easing.Bounce.Out,
            y: this.candies_box.y - 14,
            delay: 1000,
            duration: 1500,
            onComplete: () => {
                // Remove candies
                this.tweens.add({
                    targets: this.grid.getCandies(),
                    scale: 0
                });
            }
        });

        this.tweens.add({
            targets: [this.play_button],
            ease: Phaser.Math.Easing.Bounce.Out,
            y: this.candies_box.y + 60,
            delay: 1000,
            duration: 1500,
            onComplete: () => {
                // Remove candies
                this.tweens.add({
                    targets: this.grid.getCandies(),
                    scale: 0
                });
            }
        });
        this.random_buttom.resetButtom();
    }

    update(time) {
        if (this.timer !== undefined) {
            const count = ((this.count_down - this.timer.getElapsed()) / 1000).toFixed(0);
            if (count !== this.remain_time) {
                // Update time remain in screen
                this.remain_time = count;
                if (this.remain_time > 0) {
                    this.tickfx.play();
                    this.timer_text.setText(Number(this.remain_time) - 1);
                }
            }
        }
        this.random_buttom.update(time);
    }
}

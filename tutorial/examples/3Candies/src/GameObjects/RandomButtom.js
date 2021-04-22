import { candies, candy_grid, minimun_to_search } from '../global_vars.js';
import { GameObjectsBase } from "./GameObjectsBase.js";

export class RandomButtom extends GameObjectsBase {
    constructor(config) {
        super(config);
        // The first texture
        this.texture_default = config.texture;
        this.randomTimer = undefined;
        this.setName('random');

    }

    startRandom(candy_to_search_texture) {
        this.setTint(0x34495e);

        if (this.randomTimer === undefined) {

            // Texture selector
            // const candy_texture_selected = this.selectRandomCandy();
            
            this.randomTimer = setInterval(() => {
                const candy_random = Phaser.Utils.Array.GetRandom(candies);
                this.setTexture(candy_random);
            }, 100);
        

            const r = Math.random();
            const stop_at = 500;

            this.scene.time.addEvent({
                delay: stop_at,
                callback: () => {
                    this.stopRandom(candy_to_search_texture);
                }
            });
        }
    }

    selectRandomCandy() {
        let final_candy_select = Phaser.Utils.Array.GetRandom(candies);
        const quantityCandy = candy_grid.getQuantityCandiesAvailable(final_candy_select);

        if (quantityCandy < minimun_to_search) {
            return this.selectRandomCandy();
        } else {
            return final_candy_select;
        }
    }

    launchDice(candy_to_search) {
        // this.removeInteractive();

        this.scene.tweens.add({
            targets: [this],
            rotation: Phaser.Math.DegToRad(360 * 4),
            scale: 0,
            onComplete: () => {
                this.setTexture(this.texture_default);
                this.scene.tweens.add({
                    targets: [this],
                    rotation: Phaser.Math.DegToRad(-360),
                    scale: 1,
                    onComplete: () => {
                        this.startRandom(candy_to_search);
                    }
                });
            }
        });
    }

    stopRandom(texture) {
        this.clearTint();
        clearInterval(this.randomTimer);
        this.randomTimer = undefined;
        this.setTexture(texture);
        this.emit('stopped', texture);
    }

    resetButtom() {
        clearInterval(this.randomTimer);
        this.setTexture(this.texture_default);
    }

    isRandomActive() {
        return this.randomTimer === undefined;
    }
}
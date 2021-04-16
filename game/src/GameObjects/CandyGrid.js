import { GetId } from "../helpers/GetId.js";
import { GetName } from "../helpers/GetName.js";
import { candies, grid_size } from "../global_vars.js";
import { IdGenerator } from "../helpers/IdGenerator.js";

/** 
 * @class CandyGrid
 * @description Help us to know how many candies are available in the grid
*/
export class CandyGrid {
    constructor() {
        /**
         * @name candies
         * @memberof CandyGrid
         * @type Object - [{id: number, piece: Phaser.GameObject}]
         */
        this.candies = [];
        // Get array value and asign zero, example: {candy-blue: 0, candy-orange: 0, ...}
        this.candies_availables = candies.reduce((acc, curr) => (acc[curr] = 0, acc), {});

        this.actual_candy_to_search = '';

        this.initial_candy_position = {
            x: 0,
            y: 0
        };
    }

    setScene(scene) {
        this.scene = scene;
        this.marimbafx = this.scene.sound.add('marimba');
        this.marimbaReversefx = this.scene.sound.add('marimba_reverse');
    }

    setPosition(initial_position) {
        this.initial_candy_position = initial_position;
    }

    createNewGrid() {
        if(this.candies.length > 0) {
            this.marimbaReversefx.play();
            this.scene.tweens.add({
                targets: this.candies.map(candy => candy.piece),
                ease: Phaser.Math.Easing.Linear.In,
                alpha: 0,
                scale: 0,
                duration: 500,
                delay: (e, o, u, i) => 50 * i,
                onComplete: () => {
                    this.candies.map((candy) => {
                        candy.piece.destroy();
                    });
                    this.reset();
                    this.createStartGrid();
                }
            });
        } else {
            this.createStartGrid();
        }
    }

    // Help to create the grid of GameObjects
    createStartGrid() {
        this.marimbafx.play();
        this.actual_candy_to_search = this.selectRandomCandyToFind();
        const distribution_candy = [
            {
                row: Phaser.Math.Between(0, 1),
                column: Phaser.Math.Between(0, 2)
            },
            {
                row: Phaser.Math.Between(2, 3),
                column: Phaser.Math.Between(3, 5)
            },
            {
                row: Phaser.Math.Between(4, 5),
                column: Phaser.Math.Between(0, 5)
            }
        ];

        this.reset();

        for (let y = 0; y < grid_size.height; y++) {
            for (let x = 0; x < grid_size.width; x++) {
                let candy_random = this.selectRandomCandyToGrid(this.actual_candy_to_search);

                const candy_x = (x * 40) + this.initial_candy_position.x + 20;
                const candy_y = (y * 40) + this.initial_candy_position.y + 20;
                
                let put_candy_to_search = '';
                if(distribution_candy.length > 0) {
                    if(distribution_candy[0].row === y && distribution_candy[0].column === x) {
                        put_candy_to_search = this.actual_candy_to_search;
                        distribution_candy.shift();
                    } else {
                        put_candy_to_search = candy_random;
                    }
                } else {
                    put_candy_to_search = candy_random;
                }
                
                const image = this.scene.add.image(candy_x, candy_y, put_candy_to_search)
                    .setName(`${put_candy_to_search}_${IdGenerator()}`)
                    .setInteractive()
                    .setScale(0)
                    .setDepth(candy_y);

                this.push({
                    id: GetId(image.name),
                    piece: image,
                    name: GetName(image.name)
                });

                this.scene.tweens.add({
                    targets: image,
                    ease: Phaser.Math.Easing.Linear.Out,
                    alpha: 1,
                    scale: 1,
                    delay: 50 * (x + y)
                });
            }
        }
        this.scene.events.emit('grid-complete', this.actual_candy_to_search);
    }

    // Only used the first time
    push(CandyObject) {
        this.candies.push(CandyObject);
    }

    /**
     *
     *
     * @return {Array<Phaser.GameObjects.Image>} - [GameObject, GameObject, ...] 
     * @memberof CandyGrid
     */
    getCandies() {
        return this.candies.map(candy => candy.piece);
    }

    /**
     * Get candy by id
     *
     * @param {*} id
     * @return {CandyObject} 
     * @memberof CandyGrid
     */
    getCandy(id) {
        return this.candies.find((CandyObject) => {
            return CandyObject.id === id;
        });
    }

    selectRandomCandyToGrid(candy_to_find) {
        const random_candy = Phaser.Utils.Array.GetRandom(candies);
        if(candy_to_find === random_candy) {
            return this.selectRandomCandyToGrid(candy_to_find);
        } else {
            return random_candy;
        }
    }

    // Select one candy to find
    selectRandomCandyToFind() {
        this.counter_to_put_candies = 3;
        return Phaser.Utils.Array.GetRandom(candies);
    }

    reset() {
        this.candies = [];
        this.candies_availables = candies.reduce((acc, curr) => (acc[curr] = 0, acc), {});
    }
}
import { BackgroundTile } from "./BackgroundTile.js";

/**
 *
 * @param {Phaser.Scene} scene
 * @export
 * @class BackgroundConstructor
 */
export class BackgroundGenerator {
    constructor(scene, type = 'normal') {
        this.scene = scene;
        this.type = type;
        // new call, create first structure
        this.first_background = new BackgroundTile({
            scene: scene,
            x: 0,
            y: 0,
            texture: `background-${type}`,
            can_emit: false
        });

        // Down
        this.second_background = new BackgroundTile({
            scene: scene,
            x: this.first_background.x,
            y: this.first_background.y + (this.first_background.height),
            texture: `background-${type}`,
            can_emit: false
        })


        // left
        const left_tile = new BackgroundTile({
            scene: scene,
            x: this.first_background.x - (this.first_background.width),
            y: this.first_background.y,
            texture: `background-${type}`,
            can_emit: true
        })


        // left Down
        const left_down_tile = new BackgroundTile({
            scene: scene,
            x: this.first_background.x - (this.first_background.width),
            y: this.first_background.y + (this.first_background.height),
            texture: `background-${type}`,
            can_emit: true
        })


        // Right
        new BackgroundTile({
            scene: scene,
            x: this.first_background.x + (this.first_background.width) - 2,
            y: this.first_background.y,
            texture: `background-${type}`,
            can_emit: false
        })

        // Right Down
        new BackgroundTile({
            scene: scene,
            x: this.first_background.x + (this.first_background.width),
            y: this.first_background.y + (this.first_background.height),
            texture: `background-${type}`,
            can_emit: false
        })

        // Events:
        this.setEvent(this.first_background);
        this.setEvent(left_tile);
        this.setEvent(left_down_tile);
    }

    setEvent(background_tile) {
        if (background_tile.can_emit) {
            background_tile.on('inview', ({ GameObject }) => {
                GameObject.removeAllListeners('inview');
                const backgroundTile = new BackgroundTile({
                    scene: this.scene,
                    x: GameObject.x - (GameObject.width),
                    y: GameObject.y + (GameObject.y > 0) ? (GameObject.height) : 0,
                    texture: `background-${this.type}`,
                    can_emit: true
                });
                this.setEvent(backgroundTile);
            });
        }

    }
}
import { GameObjectsBase } from "../GameObjectsBase.js";

/**
 * Creator of one single tile
 *
 * @export
 * @class BackgroundTile
 * @extends {GameObjectsBase}
 */
export class BackgroundTile extends GameObjectsBase {
    constructor(config) {
        super(config);
        this.setOrigin(0);
        this.setDepth(-3);
        this.moveTile();
        this.intervalToDestroy();

        // In view
        this.in_view = false;
        this.can_emit = config.can_emit;

        this.scene.events.on('update', () => this.moveTile(), this);
    }

    intervalToDestroy() {
        this.scene.time.addEvent({
            delay: 60000 * 2, // 1 minuts
            callback: () => {
                this.destroy();
                this.emit('destroy');
            }
        });
    }

    moveTile() {
        if (!this.in_view && this.can_emit) {
            if ((this.x + this.width) > 0) {
                this.in_view = true;
                this.emit('inview', {
                    GameObject: this
                });
            }
        }
        this.x = this.x + .25;
    }
}
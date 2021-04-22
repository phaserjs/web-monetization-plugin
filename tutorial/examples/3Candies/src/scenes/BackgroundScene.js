import { BackgroundGenerator } from "../GameObjects/background/BackgroundGenerator.js";
import { background_selected } from "../global_vars.js";

export class BackgroundScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BackgroundScene'
        });
    }

    init(config) {
        this.is_premium = background_selected.active;
    }

    create() {
        // Backgrounds
        const backgroundGenerator = new BackgroundGenerator(this, this.is_premium);
    }
}
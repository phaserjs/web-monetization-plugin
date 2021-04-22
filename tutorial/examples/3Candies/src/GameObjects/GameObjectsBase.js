export class GameObjectsBase extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);
        config.scene.add.existing(this);
        this.scene = config.scene;
    }
}
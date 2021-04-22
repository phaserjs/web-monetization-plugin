import { lifes, premium_lifes } from "../global_vars.js";

export class Lifes {
    constructor(scene, is_premium) {
        this.scene = scene;

        this.normal_lifes = lifes;
        this.premium_lifes = premium_lifes;

        this.is_premium = is_premium;

        this.lifes = [];

        this.createLifes();

        this.wooshfx = this.scene.sound.add('woosh', { volume: .5 });
    }

    createLifes() {
        for (let i = 0; i < this.normal_lifes; i++) {
            this.lifes.push(
                this.scene.add.image(168 + (i * 60), -60, 'normal-life')
            );
        }

        if (this.is_premium) {
            const last_life = this.lifes[this.lifes.length - 1];
            for (let i = 0; i < this.premium_lifes; i++) {
                this.lifes.push(
                    this.scene.add.image(last_life.x + 60 + (i * 60), -60, 'premium-life')
                );
            }
        }

        this.scene.tweens.add({
            targets: this.lifes,
            ease: Phaser.Math.Easing.Quintic.Out,
            y: 30,
            delay: 1000
        });
    }

    removeLife() {
        const removed = this.lifes.shift();
        this.scene.time.addEvent({
            delay: 450,
            callback: () => {
                this.wooshfx.play();
            }
        });
        this.scene.tweens.add({
            targets: [removed],
            ease: Phaser.Math.Easing.Bounce.In,
            y: -100,
            onComplete: () => {
                removed.destroy();
            }
        });
    }

    addLifes(is_premium) {
        if (is_premium) {
            const last_life = this.lifes[this.lifes.length - 1];
            const new_life = this.scene.add.image(last_life.x + 60, -60, 'premium-life');
            this.lifes.push(new_life);
            this.scene.tweens.add({
                targets: new_life,
                ease: Phaser.Math.Easing.Quintic.Out,
                y: 30,
                delay: 1000
            });
        }
    }
    
    getLifes() {
        return this.lifes.length;
    }
}
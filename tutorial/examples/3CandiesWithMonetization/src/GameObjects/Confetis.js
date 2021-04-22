let anim = {};
let generarAnimacion = [''];

class AnimatedParticle extends Phaser.GameObjects.Particles.Particle {
    constructor(emitter) {
        super(emitter);
        this.t = 0;
        this.i = 0;
        this.name = emitter.name;
    }

    update(delta, step, processors) {
        super.update(delta, step, processors);
        this.t += delta;
        if (this.t >= anim[this.name].msPerFrame) {
            this.i++;
            if (this.i > anim[this.name].frames.length - 1) {
                this.i = 0;
            }
            this.frame = anim[this.name].frames[this.i].frame;
            this.t -= anim[this.name].msPerFrame;
        }
    }
}

class Confetis {
    constructor(config, frames) {
        this.scene = config.scene;
        this.key = config.key;
        this.frames = frames;
        if (!(generarAnimacion.some((x) => x === frames.name))) {
            const config2 = {
                key: this.frames.name,
                frames: this.scene.anims.generateFrameNames(this.key, {
                    prefix: this.frames.prefix,
                    start: this.frames.start,
                    end: this.frames.end
                }),
                frameRate: 18,
                repeat: -1
            };
            anim[this.frames.name] = this.scene.anims.create(config2);
            generarAnimacion.push(frames.name);
        }
    }
    createConfetis() {
        this.particle = this.scene.add.particles(this.key);
        this.particle.setDepth(3000);

        const particles = this.particle.createEmitter({
            name: this.frames.name,
            x: this.frames.x,
            y: this.frames.y,
            lifespan: 1000,
            frequency: 40,
            scale: 2,
            angle: {
                min: 0,
                max: 180
            },
            speed: {
                min: 0,
                max: 200
            },
            gravityY: 50,
            particleClass: AnimatedParticle,
        });

        setTimeout(() => {
            particles.stop();
            // this.destroy();
        }, this.frames.timeStop);
    }

}

export class constructorConfeti {
    constructor(Scene) {

        this.scene = Scene;
        const confetiConfg = {
            scene: Scene,
            key: 'confetis'
        }
        const timeStop = 2000;
        const y = -100;

        this.confetis = [
            new Confetis(confetiConfg, {
                name: 'azul0',
                x: 150,
                y: y,
                prefix: 'papel-azul_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'rojo',
                x: 190,
                y: y,
                prefix: 'papel-rojo_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'amarillo',
                x: 200,
                y: y,
                prefix: 'papel-amarillo_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'naranja',
                x: 240,
                y: y,
                prefix: 'papel-naranja_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'verde',
                x: 270,
                y: y,
                prefix: 'papel-verde_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'azul',
                x: 300,
                y: y,
                prefix: 'papel-azul_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'morado',
                x: 350,
                y: y,
                prefix: 'papel-morado_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'naranja_dos',
                x: 390,
                y: y,
                prefix: 'papel-naranja_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
            new Confetis(confetiConfg, {
                name: 'amarillo_dos',
                x: 410,
                y: -50,
                prefix: 'papel-amarillo_',
                start: 0,
                end: 3,
                timeStop: timeStop
            }),
        ];

        this.launch = () => {
            this.confetis.map((x) => {
                x.createConfetis()
            });
        }
    }


}

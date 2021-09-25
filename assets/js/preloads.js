class Preloads extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloads' });
    }

    preload() {
        this.load.image('primera_etapa', 'assets/images/primera_etapa.png');
        this.load.image('segunda_etapa', 'assets/images/segunda_etapa.png');
        this.load.image('horizontal', 'assets/images/horizontal.png');
        this.load.image('vertical', 'assets/images/vertical.png');
        this.load.spritesheet('personaje', 'assets/images/personaje.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('pelota', 'assets/images/pelota.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('personaje_fuera', 'assets/images/fuera_pj.png', { frameWidth: 32, frameHeight: 32 });

        this.load.audio('multitud', 'assets/sounds/multitud.ogg');
        this.load.audio('emocion', 'assets/sounds/emocion.ogg');
        this.load.audio('patada', 'assets/sounds/patada.ogg');
        this.load.audio('silbato', 'assets/sounds/silbato.ogg');
    }
 
    create() {
        this.sound.play("multitud", {loop: true, volume: .7});

        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pelota_gira',
            frames: this.anims.generateFrameNumbers('pelota', { start: 0, end: 4 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'personaje_fuera',
            frames: this.anims.generateFrameNumbers('personaje_fuera', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.start('nivel_1');
    }
}
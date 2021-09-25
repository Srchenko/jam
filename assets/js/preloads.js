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
    }
 
    create() {
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

        this.scene.start('nivel_1');
    }
}
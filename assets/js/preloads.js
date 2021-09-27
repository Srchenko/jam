class Preloads extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloads' });
    }

    preload() {
        this.load.image('primera_etapa', 'assets/images/primera_etapa.png');
        this.load.image('segunda_etapa', 'assets/images/segunda_etapa.png');
        this.load.image('horizontal', 'assets/images/horizontal.png');
        this.load.image('vertical', 'assets/images/vertical.png');

        this.load.image('copa_america', 'assets/images/copa_america.png');
        this.load.image('copa_libertadores', 'assets/images/copa_libertadores.png');
        this.load.image('copa_mundo', 'assets/images/copa_mundo.png');

        this.load.image('req_america', 'assets/images/req_america.png');
        this.load.image('req_libertadores', 'assets/images/req_libertadores.png');
        this.load.image('req_mundo', 'assets/images/req_mundo.png');

        this.load.image('ui_vida_arquero', 'assets/images/ui_vida_arquero.png');
        this.load.image('ui_soporte_trofeos', 'assets/images/soporte_trofeos.png');

        this.load.spritesheet('copa_america_spritesheet', 'assets/images/copa_america_spritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('copa_libertadores_spritesheet', 'assets/images/copa_libertadores_spritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('copa_mundo_spritesheet', 'assets/images/copa_mundo_spritesheet.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('jefe', 'assets/images/jefe.png', { frameHeight: 816, frameWidth: 1920 });

        this.load.spritesheet('personaje', 'assets/images/personaje.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemigo_1', 'assets/images/enemigo_1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemigo_2_1', 'assets/images/enemigo_2_1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemigo_2_2', 'assets/images/enemigo_2_2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('pelota', 'assets/images/pelota.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('personaje_fuera', 'assets/images/fuera_pj.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('no_puerta', 'assets/images/no_puerta.png', { frameWidth: 32, frameHeight: 32 });

        for(let i = 0; i < 15; i++) { 
            this.load.image(`nivel_${i+1}`, `assets/images/Fondo ${i+1}.png`);
        }

        // this.load.audio('multitud', 'assets/sounds/multitud.ogg');
        // this.load.audio('emocion', 'assets/sounds/emocion.ogg');
        // this.load.audio('patada', 'assets/sounds/patada.ogg');
        // this.load.audio('silbato', 'assets/sounds/silbato.ogg');
    }
 
    create() {
        // this.sound.play("multitud", {loop: true, volume: .7});

        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemigo_moverse',
            frames: this.anims.generateFrameNumbers('enemigo_1', { start: 0, end: 3 }),
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
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'no_puerta',
            frames: this.anims.generateFrameNumbers('no_puerta', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'copa_libertadores_spritesheet',
            frames: this.anims.generateFrameNumbers('copa_libertadores_spritesheet', { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'copa_america_spritesheet',
            frames: this.anims.generateFrameNumbers('copa_america_spritesheet', { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'copa_mundo_spritesheet',
            frames: this.anims.generateFrameNumbers('copa_mundo_spritesheet', { start: 0, end: 12 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'jefe_move',
            frames: this.anims.generateFrameNumbers('jefe', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'jefe_ataja',
            frames: this.anims.generateFrameNumbers('jefe', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'jefe_quieto',
            frames: this.anims.generateFrameNumbers('jefe', { start: 1, end: 1 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'enemigo_2_1',
            frames: this.anims.generateFrameNumbers('enemigo_2_1', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'enemigo_2_2',
            frames: this.anims.generateFrameNumbers('enemigo_2_2', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        this.scene.start('tunel');
    }
}
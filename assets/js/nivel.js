class Nivel_1 extends Phaser.Scene {
    constructor() {
        super("nivel_1");
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, "primera_etapa");

        let lvl_nuevo = this.add.rectangle(960, 0, 250, 60, 0xffffff);
        this.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;

        let bordes = this.physics.add.group();
        bordes.create(101, 101, "vertical").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(1821, 101, "vertical").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(101, 101, "horizontal").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(101, 981, "horizontal").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);

        Funciones.initJugador(this);
        Funciones.initPelota(this);

        Funciones.initInputs(this);

        this.initColliders();
        
        this.physics.add.collider(jugador, lvl_nuevo, this.cambiarNivel, null, this);
        this.physics.add.collider(bordes, pelota, Funciones.fueraLinea, null, this);
    }

    update(delta) {
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
    }

    cambiarNivel(uno, dos){
        this.scene.start('nivel_2');
    }
}
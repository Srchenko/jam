class Nivel_1 extends Phaser.Scene {
    constructor() {
        super("nivel_1");
    }

    create() {
        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, "primera_etapa");

        let lvl_nuevo = this.add.rectangle(960, 0, 250, 60, 0xffffff);
        this.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;

        Funciones.initJugador(this);
        Funciones.initPelota(this);

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
        
        this.physics.add.collider(jugador, lvl_nuevo, this.cambiarNivel, null, this);
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
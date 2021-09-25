class Nivel_2 extends Phaser.Scene {
    constructor() {
        super("nivel_2");
    }

    create(){
        let lvl_nuevo = this.add.rectangle(960, 0, 250, 60, 0xffffff);
        this.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;

        this.add.image(config.width / 2, config.height / 2, "segunda_etapa");

        Funciones.initJugador(this);
        Funciones.initPelota(this);

        Funciones.initInputs(this);

        this.initColliders();
        
        this.physics.add.collider(jugador, lvl_nuevo, this.cambiarNivel, null, this);
    }

    update(){
        Funciones.updateJugador(this, jugador);

        Funciones.updatePelota(this, pelota);
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
    }

    cambiarNivel(uno, dos){
        this.scene.start('nivel_2');
    }
}
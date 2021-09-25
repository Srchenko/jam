class Nivel_2 extends Phaser.Scene {
    constructor() {
        super("nivel_2");
    }

    create(){
        sceneGlobal = this;

        let lvl_nuevo = this.add.rectangle(960, 0, 250, 60, 0xffffff);
        this.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;

        this.add.image(config.width / 2, config.height / 2, "segunda_etapa");

        Funciones.initJugador(this);
        Funciones.initPelota(this);

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
        
        this.physics.add.collider(jugador, lvl_nuevo, this.cambiarNivel, null, this);
    }

    update(delta){
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);

        let col = this.add.rectangle(1627.3856975381009, 695.5216881594373, 110.29308323563896,  281.3599062133645, 0xffffff).setOrigin(0, 0).setAlpha(0);
        this.physics.add.existing(col, true);
        this.physics.add.collider(pelota, col, null, null, this);
        this.physics.add.collider(jugador, col, null, null, this);

        let cole = this.add.rectangle(166.56506447831185, 130.55099648300117, 92.28604923798355,  274.6072684642438, 0xffffff).setOrigin(0, 0).setAlpha(0);
        this.physics.add.existing(cole, true);
        this.physics.add.collider(pelota, cole, null, null, this);
        this.physics.add.collider(jugador, cole, null, null, this);
    }

    cambiarNivel(uno, dos){
        this.scene.start('nivel_2');
    }
}
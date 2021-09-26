class Tunel extends Phaser.Scene {
    constructor() {
        super("tunel");
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

        //sprintBar.bar.setBlendMode(Phaser.BlendModes.EXCLUSION);
    }       

    update(time, delta) {
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);

        obstaculos.forEach(obstaculo => {
            if (obstaculo.name != "bordes") {
                this.physics.add.collider(pelota, obstaculo, Funciones.rebotaObstaculo, null, this);
                this.physics.add.collider(jugador, obstaculo, null, null, this);
            }else {
                //this.physics.add.collider(pelota, obstaculo, Funciones.rebotaObstaculo, null, this);
            }
            enemigos.forEach(enemigo => {
                this.physics.add.collider(enemigo, obstaculo, Funciones.rotarEnemigo, null, this);
            });
        });

        enemigos.forEach(enemigo => {
            this.physics.add.collider(pelota, enemigo, Funciones.patearEnemigo, null, this);
        });
    }

    cambiarNivel(uno, dos){
        this.scene.start('nivel_1');
    }
}
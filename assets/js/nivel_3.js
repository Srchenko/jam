class Nivel_3 extends Phaser.Scene {
    constructor() {
        super("nivel_3");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 960, y: 225});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
    
        Funciones.arbitro_derecha(this, "nivel_5");
        Funciones.arbitro_abajo(this, "nivel_2");
    }

    update(time, delta){
        if (!menu_pausa_bool) {
            Funciones.updateJugador(this, jugador, delta);

            Funciones.updatePelota(this, pelota);

            Funciones.updateEnemigo(this, enemigo);
        }
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1627.9905437352245, 699.0070921985815, 101.37115839243506,  276.8794326241135, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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
            enemigos_grandes.forEach(enemigo => {
                this.physics.add.collider(enemigo, obstaculo, Funciones.rotarEnemigoGrande, null, this);
            });
        });

        enemigos.forEach(enemigo => {
            this.physics.add.overlap(pelota, enemigo, Funciones.patearEnemigo, null, this);
        });
        enemigos_grandes.forEach(enemigo => {
            this.physics.add.overlap(pelota, enemigo, Funciones.patearEnemigoGrande, null, this);
        });
    }
}
class Nivel_15 extends Phaser.Scene {
    constructor() {
        super("nivel_15");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 397, y: 225});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        ventaja = -7;
    
        Funciones.arbitro_izquierda(this, "nivel_14");

        Interfaz.mostrar_barra_vida_jefe();

        Funciones.initJefe(this);

        this.initColliders();
    }

    update(time, delta){
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);

        Funciones.updateEnemigo(this, enemigo);

        Funciones.updateJefe(this);
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
        this.physics.add.collider(pelota, jefe, Funciones.patearJefe, null, this);

        let gol = this.add.rectangle(1773.6928487690504, 144.05627198124267, 137.3036342321218,  805.8147713950761, 0xffffff).setOrigin(0, 0).setAlpha(0);
        this.physics.add.existing(gol, true);
        this.physics.add.collider(pelota, gol, Funciones.gol, null, this);
        
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
            this.physics.add.collider(pelota, enemigo, Funciones.patearEnemigo, null, this);
        });
        enemigos_grandes.forEach(enemigo => {
            this.physics.add.collider(pelota, enemigo, Funciones.patearEnemigoGrande, null, this);
        });
    }
}
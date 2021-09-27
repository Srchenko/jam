class Nivel_14 extends Phaser.Scene {
    constructor() {
        super("nivel_14");
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

        this.initColliders();

        Interfaz.mostrar_dialogo_copa_mundo();
        
        Funciones.arbitro_izquierda(this, "nivel_13");
        Funciones.arbitro_derecha(this, "nivel_15", {x: 0, y: 0}, {x: 0, y: 0}, {req: true, copa:"copa_3"});
    }

    update(time, delta){
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);

        Funciones.updateEnemigo(this, enemigo);
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
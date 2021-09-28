class Nivel_13 extends Phaser.Scene {
    constructor() {
        super("nivel_13");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        
        Funciones.initEnemigo(this, (Math.PI / 2) + (Math.PI / 4), {x: 1400, y: 800}, {x: 300, y: 300});
        Funciones.initEnemigo(this, (Math.PI / 2) + (Math.PI / 4), {x: 400, y: 800}, {x: -300, y: -300});
        Funciones.initEnemigo(this, (Math.PI / 2) + (Math.PI / 4), {x: 400, y: 200});
        Funciones.initEnemigosDuo(this);

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
    
        Funciones.arbitro_izquierda(this, "nivel_11");
        Funciones.arbitro_derecha(this, "nivel_14");
    }

    update(time, delta){
        Funciones.updateJugador(this, jugador, delta);

        if (!menu_pausa_bool) {
            Funciones.updatePelota(this, pelota);

            Funciones.updateEnemigo(this, enemigo);

            Funciones.updateEnemigosDuo(this, delta);
        }
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
            this.physics.add.overlap(pelota, enemigo, Funciones.patearEnemigo, null, this);
        });
        enemigos_grandes.forEach(enemigo => {
            this.physics.add.overlap(pelota, enemigo, Funciones.patearEnemigoGrande, null, this);
        });

        if (progreso_del_juego[this.sys.config] == 0) {
            obstaculos.forEach(obstaculo => {
                this.physics.add.collider(enemigos_duo.x, obstaculo, Funciones.rotarEnemigo, null, this);
                this.physics.add.collider(enemigos_duo.o, obstaculo, Funciones.rotarEnemigo, null, this);
            });
            this.physics.add.overlap(pelota, enemigos_duo.x, Funciones.patearEnemigoX, null, this);
            this.physics.add.overlap(pelota, enemigos_duo.o, Funciones.patearEnemigoO, null, this);
        }
    }
}
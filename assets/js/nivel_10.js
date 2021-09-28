class Nivel_10 extends Phaser.Scene {
    constructor() {
        super("nivel_10");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 1100, y: 700});
        Funciones.initEnemigosDuo(this);

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();

        Interfaz.mostrar_dialogo_copa_america();
        
        Funciones.arbitro_arriba(this, "nivel_11", {x: 200, y: 0}, {x: 0, y: 0}, {req: true, copa: "copa_2"});
        Funciones.arbitro_abajo(this, "nivel_7");
        Funciones.arbitro_izquierda(this, "nivel_9");
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
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(229.97635933806146, 127.09219858156028, 105.91016548463358,  304.11347517730496, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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
class Nivel_9 extends Phaser.Scene {
    constructor() {
        super("nivel_9");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;
        Interfaz.canto("canto_extranio");

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this, {x: 1440, y: 540});
        
        Funciones.initEnemigo(this, (Math.PI / 2) - (Math.PI / 4), {x: 1200, y: 245});
        Funciones.initEnemigo(this, (Math.PI / 2) + (Math.PI / 4), {x: 1400, y: 800}, {x: 300, y: 300});

        Funciones.initInputs(this);
        Funciones.initBordes(this, {
            derecha: {x: 0, y: 0},
            izquierda: {x: 880, y: 0}
        });

        this.initColliders();
    
        Funciones.arbitro_abajo(this, "nivel_8", {x: 400, y: 0}, {x: 300, y: 0});
        Funciones.arbitro_derecha(this, "nivel_10");
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
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(835.177304964539, 0, 22.695035460992926,  1075.7446808510638, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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
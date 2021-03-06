class Nivel_1 extends Phaser.Scene {
    constructor() {
        super("nivel_1");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        Funciones.initEnemigo(this, (Math.PI / 2) + (Math.PI / 4), {x: 1367, y: 225});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();

        Interfaz.mostrar_dialogo_copa_libertadores();
    
        Funciones.arbitro_arriba(this, "nivel_2");
        Funciones.arbitro_izquierda(this, "nivel_6", {x: 0, y: 0}, {x: 0, y: 0}, {req: true, copa: "copa_1"});
        Funciones.arbitro_abajo(this, "tunel");
    }

    update(time, delta){
        if (espera < 2600){
            espera += delta;
        }

        if (!menu_pausa_bool && espera >= 2600) {
            Funciones.updateJugador(this, jugador, delta);

            Funciones.updatePelota(this, pelota);

            Funciones.updateEnemigo(this, enemigo);
        }
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
        
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1627.3856975381009, 695.5216881594373, 110.29308323563896,  281.3599062133645, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(166.56506447831185, 130.55099648300117, 92.28604923798355,  274.6072684642438, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);

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
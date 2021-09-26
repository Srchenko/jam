class Nivel_3 extends Phaser.Scene {
    constructor() {
        super("nivel_3");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        let lvl_nuevo = this.add.rectangle(960, 0, 250, 60, 0xffffff);
        this.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;

        this.add.image(config.width / 2, config.height / 2, "segunda_etapa");

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        //Funciones.initEnemigo(this, (Math.PI / 2) - (Math.PI / 4), {x: 1627.3856975381009, y: 695.5216881594373});
        //Funciones.initEnemigo(this, (Math.PI / 2) - (Math.PI / 4), {x: 167.3856975381009, y: 165.5216881594373});
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 397.3856975381009, y: 225.5216881594373});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
        
        this.physics.add.collider(jugador, lvl_nuevo, this.cambiarNivel, null, this);
    }

    update(time, delta){
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);

        Funciones.updateEnemigo(this, enemigo);
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
            this.physics.add.collider(pelota, enemigo, Funciones.patearEnemigo, null, this);
        });
        enemigos_grandes.forEach(enemigo => {
            this.physics.add.collider(pelota, enemigo, Funciones.patearEnemigoGrande, null, this);
        });
    }

    cambiarNivel(uno, dos){
        this.scene.start('nivel_2');
    }
}
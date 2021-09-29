class Nivel_7 extends Phaser.Scene {
    constructor() {
        super("nivel_7");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);
        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 397, y: 225});
        Funciones.initEnemigo(this, (Math.PI / 2) + (Math.PI / 4), {x: 1400, y: 800}, {x: 300, y: 300});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
    
        Funciones.arbitro_arriba(this, "nivel_10");
        Funciones.arbitro_izquierda(this, "nivel_8");
        Funciones.arbitro_abajo(this, "nivel_6");
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
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(181.56028368794327, 813.9952718676122, 270.8274231678487,  99.85815602836885, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1494.8463356973996, 128.60520094562648, 282.93144208037825,  98.34515366430259, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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
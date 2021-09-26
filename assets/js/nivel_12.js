class Nivel_12 extends Phaser.Scene {
    constructor() {
        super("nivel_12");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);
        let copa_mundo = this.physics.add.sprite(450, 680, 'copa_mundo').setScale(10).setOrigin(0.5);
        copa_mundo.setSize(10, 10);
        this.tweens.add({
            targets: copa_mundo,
            rotation: Math.PI,
            duration: 1000,
            loop: -1,
            ease: 'Linear'
        });
        let copa_start_y = copa_mundo.y;
        this.tweens.addCounter({
            from: -1,
            to: 1,
            ease: 'Linear',
            duration: 1000,
            repeat: -1,
            yoyo: false,
            onUpdate: function (tween) {
                copa_mundo.y = Math.abs(tween.getValue() * 30) + copa_start_y;
                copa_mundo.alpha = Math.abs(tween.getValue());
            }
        });

        Funciones.initJugador(this);
        this.physics.add.collider(jugador, copa_mundo, this.agarrarCopa, null, this);
        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 397, y: 225});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
    
        Funciones.arbitro_derecha(this, "nivel_11");
    }

    update(time, delta){
        Funciones.updateJugador(this, jugador, delta);

        Funciones.updatePelota(this, pelota);

        Funciones.updateEnemigo(this, enemigo);
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1567.4704491725768, 151.30023640661938, 282.93144208037825,  108.93617021276594, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1568.983451536643, 813.9952718676122, 285.95744680851044,  104.39716312056737, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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

    agarrarCopa(jugador, copa) {
        copa.destroy();
        copas.copa_3 = true;
    }
}
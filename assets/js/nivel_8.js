class Nivel_8 extends Phaser.Scene {
    constructor() {
        super("nivel_8");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;

        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);

        if (!copas.copa_2) {
            let copa_america = this.physics.add.sprite(400, 680, 'copa_america').setScale(10).setOrigin(0.5);
            copa_america.setSize(10, 10);
            this.tweens.add({
                targets: copa_america,
                rotation: Math.PI,
                duration: 1000,
                loop: -1,
                ease: 'Linear'
            });
            let copa_start_y = copa_america.y;
            this.tweens.addCounter({
                from: -1,
                to: 1,
                ease: 'Linear',
                duration: 1000,
                repeat: -1,
                yoyo: false,
                onUpdate: function (tween) {
                    copa_america.y = Math.abs(tween.getValue() * 30) + copa_start_y;
                    copa_america.alpha = Math.abs(tween.getValue());
                }
            });

            this.physics.add.collider(jugador, copa_america, this.agarrarCopa, null, this);
        }
        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 397, y: 225});
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 1500, y: 800});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
    
        Funciones.arbitro_arriba(this, "nivel_9", {x: 300, y: 0}, {x: 400, y: 0});
        Funciones.arbitro_derecha(this, "nivel_7");
    }

    update(time, delta){
        Funciones.updateJugador(this, jugador, delta);

        if (!menu_pausa_bool) {
            Funciones.updatePelota(this, pelota);

            Funciones.updateEnemigo(this, enemigo);
        }
    }

    initColliders() {
        this.physics.add.collider(pelota, jugador, Funciones.patear, null, this);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(69.59810874704492, 820.0472813238771, 290.4964539007092,  99.85815602836874, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(742.8841607565012, 818.5342789598109, 278.3924349881796,  99.85815602836874, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1463.0732860520095, 817.0212765957447, 288.98345153664286,  98.34515366430264, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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

    agarrarCopa(jugador, copa) {
        Interfaz.play_sonido("checkpoint");
        copa.destroy();
        copas.copa_2 = true;
        Interfaz.cambiarMusica("musica_3");
    }
}
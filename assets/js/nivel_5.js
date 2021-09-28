class Nivel_5 extends Phaser.Scene {
    constructor() {
        super("nivel_5");
    }

    create(){
        obstaculos = [];
        enemigos = [];

        sceneGlobal = this;
        
        this.add.image(config.width / 2, config.height / 2, this.sys.config);

        Funciones.initJugador(this);

        if (!copas.copa_1) {
            let copa_libertadores = this.physics.add.sprite(1500, 400, 'copa_libertadores').setScale(10).setOrigin(0.5);
            copa_libertadores.setSize(10, 10);
            this.tweens.add({
                targets: copa_libertadores,
                rotation: Math.PI,
                duration: 1000,
                loop: -1,
                ease: 'Linear'
            });
            let copa_start_y = copa_libertadores.y;
            this.tweens.addCounter({
                from: -1,
                to: 1,
                ease: 'Linear',
                duration: 1000,
                repeat: -1,
                yoyo: false,
                onUpdate: function (tween) {
                    copa_libertadores.y = Math.abs(tween.getValue() * 30) + copa_start_y;
                    copa_libertadores.alpha = Math.abs(tween.getValue());
                }
            });
            this.physics.add.collider(jugador, copa_libertadores, this.agarrarCopa, null, this);
        }

        Funciones.initPelota(this);
        
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 397, y: 225});
        Funciones.initEnemigoGrandote(this, (Math.PI / 2) - (Math.PI / 4), {x: 1500, y: 850});

        Funciones.initInputs(this);
        Funciones.initBordes(this);

        this.initColliders();
    
        Funciones.arbitro_izquierda(this, "nivel_3");
        Funciones.arbitro_abajo(this, "nivel_4", {x: 0, y: 0}, {x: -480, y: 0});
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
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(726.2411347517731, 60.520094562647756, 284.44444444444434,  89.26713947990544, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);
        
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
        copa.destroy();
        copas.copa_1 = true;
        Interfaz.cambiarMusica("musica_2");
    }
}
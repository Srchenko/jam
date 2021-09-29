class Tunel extends Phaser.Scene {
    constructor() {
        super("tunel");
    }

    create() {
        sceneGlobal = this;

        if (primeraVez) {
            Interfaz.mostrar_menu_inicio();
        }

        this.add.image(config.width / 2, config.height / 2, "primera_etapa");

        let lvl_nuevo = this.add.rectangle(960, 0, 250, 60, 0xffffff);
        this.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;

        Funciones.initJugador(this);
        Funciones.initInputs(this);
        
        this.physics.add.collider(jugador, lvl_nuevo, this.cambiarNivel, null, this);

        this.initColliders();
    }       

    update(time, delta) {
        Funciones.updateJugador(this, jugador, delta);
    }

    cambiarNivel(uno, dos){
        posicion_inicio = {x: 960, y: 900};
        this.scene.start('nivel_1');
    }

    initColliders() {
        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(647.5650118203309, 0, 10.591016548463358,  1074.2316784869977, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);

        this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(1258.8179669030733, 1.5130023640661938, 24.208037825059137,  1074.2316784869977, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);

        obstaculos.forEach(obstaculo => {
            if (obstaculo.name != "bordes") {
                this.physics.add.collider(jugador, obstaculo, null, null, this);
            }
        });
    }
}
let sprintBar = {
    bar: null,
    progress: 0
};

let dibujando = false;
let dibujostart = {x:0, y:0};

let copas_ui = {
    copa_1: null,
    copa_2: null,
    copa_3: null
}

let copas_dialogs = {
    copa_1: null,
    copa_2: null,
    copa_3: null
}

let barra_vida_jefe = null;
let barra_vida_jefe_progreso;

class Interfaz extends Phaser.Scene {
    constructor() {
        super({ key: 'interfaz', active: true });
    }

    preload() {
        this.load.spritesheet('barrita', 'assets/images/ui_sprint_barra0.png', { frameWidth: 64, frameHeight: 16 });
    }

    create() {
        sprintBar.bar = this.add.sprite(20, 20, 'barrita').setOrigin(0, 0).setScale(5);
        sprintBar.bar.alpha = 0.9;

        this.add.sprite(config.width,100, 'ui_soporte_trofeos').setOrigin(1,0).setScale(4);
        copas_ui.copa_3 = this.add.sprite(config.width, 20, 'copa_mundo_spritesheet').setOrigin(1, 0).setScale(4);
        copas_ui.copa_2 = this.add.sprite(config.width - 100, 20, 'copa_america_spritesheet').setOrigin(1, 0).setScale(4);
        copas_ui.copa_1 = this.add.sprite(config.width - 200, 20, 'copa_libertadores_spritesheet').setOrigin(1, 0).setScale(4);

        

        copas_dialogs.copa_1 = this.add.sprite(60, config.height / 2, 'req_libertadores').setOrigin(0, 1).setScale(4).setVisible(false);
        copas_dialogs.copa_2 = this.add.sprite(config.width/2 + 160, 20, 'req_america').setOrigin(1, 0).setScale(4).setVisible(false);
        copas_dialogs.copa_3 = this.add.sprite(config.width - 60, config.height / 2, 'req_mundo').setOrigin(1, 1).setScale(4).setVisible(false);

        barra_vida_jefe_progreso = this.add.rectangle(config.width / 2, 138, 756.2 / 2, 60, 0x526391).setOrigin(1, 1).setVisible(false);
        barra_vida_jefe = this.add.sprite(config.width / 2, 150, 'ui_vida_arquero').setOrigin(0.5, 1).setScale(2).setVisible(false);

        

        this.input.keyboard.on('keydown-' + 'X', function (event) { progreso_del_juego = {
            nivel_1: 1,
            nivel_2: 1,
            nivel_3: 1,
            nivel_4: 1,
            nivel_5: 1,
            nivel_6: 1,
            nivel_7: 1,
            nivel_8: 1,
            nivel_9: 1,
            nivel_10: 1,
            nivel_11: 1,
            nivel_12: 1,
            nivel_13: 1,
            nivel_14: 1,
            nivel_15: 1
        };
        copas.copa_1 = true;
        copas.copa_2 = true;
        copas.copa_3 = true; 
        stamina = 100 * 99999;
        }, this);

        // BORRAR TODO ESTO PARA EL ENTREGAR.
        this.input.on('pointerup', function(pointer){
            var touchX = pointer.x;
            var touchY = pointer.y;
            
            if(!dibujando){
                this.add.rectangle(touchX, touchY, 20, 20, 0xffffff);
                dibujostart.x = touchX;
                dibujostart.y = touchY;
                dibujando = true;
            }else{
                if (pointer.x - dibujostart.x < 0 || pointer.y - dibujostart.y < 0) {
                    this.add.rectangle(dibujostart.x, dibujostart.y, pointer.x - dibujostart.x,  pointer.y - dibujostart.y, 0xff0000).setOrigin(0, 0).setAlpha(0.2);
                    this.add.rectangle(touchX, touchY, 20, 20, 0xffffff);

                    console.log("Al revés porfi");

                }else {
                    this.add.rectangle(dibujostart.x, dibujostart.y, pointer.x - dibujostart.x,  pointer.y - dibujostart.y, 0xffffff).setOrigin(0, 0).setAlpha(0.2);
                    this.add.rectangle(touchX, touchY, 20, 20, 0xffffff);

                    console.log(`this.physics.add.existing(obstaculos[obstaculos.push(this.add.rectangle(${dibujostart.x}, ${dibujostart.y}, ${pointer.x - dibujostart.x},  ${pointer.y - dibujostart.y}, 0xffffff).setOrigin(0, 0).setAlpha(0)) - 1], true);`);
                }
                dibujando = false;
            }
        }, this);
        // ---------------------------------------------

    }

    update(time, delta) {
        sprintBar.bar.setFrame(sprintBar.progress);
        barra_vida_jefe_progreso.width = vida_jefe * 7.6;

        if (copas.copa_1) {
            copas_ui.copa_1.setAlpha(1);
            copas_ui.copa_1.anims.play('copa_libertadores_spritesheet', true);
        }else {
            copas_ui.copa_1.setAlpha(0.5);
        }
        if (copas.copa_2) {
            copas_ui.copa_2.setAlpha(1);
            copas_ui.copa_2.anims.play('copa_america_spritesheet', true);
        }else {
            copas_ui.copa_2.setAlpha(0.5);
        }
        if (copas.copa_3) {
            copas_ui.copa_3.setAlpha(1);
            copas_ui.copa_3.anims.play('copa_mundo_spritesheet', true);
        }else {
            copas_ui.copa_3.setAlpha(0.5);
        }
    }

    static mostrar_dialogo_copa_libertadores() {
        copas_dialogs.copa_1.visible = true;
    }

    static mostrar_dialogo_copa_america() {
        copas_dialogs.copa_2.visible = true;
    }

    static mostrar_dialogo_copa_mundo() {
        copas_dialogs.copa_3.visible = true;
    }

    static ocultar_todo() {
        copas_dialogs.copa_1.visible = false;
        copas_dialogs.copa_2.visible = false;
        copas_dialogs.copa_3.visible = false;
    }

    static mostrar_barra_vida_jefe() {
        barra_vida_jefe.visible = true;
        barra_vida_jefe_progreso.visible = true;
    }
}
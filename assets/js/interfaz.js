let sprintBar = {
    bar: null,
    progress: 0
};

let dibujando = false;
let dibujostart = {x:0, y:0};

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
        }; });

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
    }
}
let sprintBar = {
    bar: null,
    progress: 0
};

let dibujando = false;
let dibujostart = {x:0, y:0};

let copas_ui = {
    copa_1: null,
    copa_2: null,
    copa_3: null,
    soporte: null
}

let copas_dialogs = {
    copa_1: null,
    copa_2: null,
    copa_3: null
}

let menu_inicio = {
    fondo: null,
    fondo_fondo: null,
    boton_jugar: null,
    boton_creditos: null
};

let menu_creditos = {
    fondo: null,
    boton_volver: null
};

let menu_pausa = {
    fondo: null,
    ventana: null,
};

let menu_derrota = {
    fondo: null
}

let menu_victoria = {
    fondo: null
}

let menu_controles = {
    fondo: null,
    pelota: null
}

let menu_pausa_tweens = false;
let menu_pausa_bool = false;

let barra_vida_jefe = null;
let barra_vida_jefe_progreso;

class Interfaz extends Phaser.Scene {
    constructor() {
        super({ key: 'interfaz', active: true });
    }

    preload() {
        this.load.image('ui_menu_pausa', 'assets/images/menu_pausa.png');
        this.load.spritesheet('barrita', 'assets/images/ui_sprint_barra0.png', { frameWidth: 64, frameHeight: 16 });
        this.load.spritesheet('ui_menu_inicio', 'assets/images/menu_inicio.png', { frameWidth: 128, frameHeight: 72 });
        this.load.spritesheet('ui_creditos_menu', 'assets/images/menu_creditos.png', { frameWidth: 128, frameHeight: 72 });
        this.load.spritesheet('ui_menu_exit', 'assets/images/menu_exit.png', { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet('ui_menu_victoria', 'assets/images/menu_victoria.png', { frameWidth: 128, frameHeight: 72 });
        this.load.spritesheet('ui_menu_derrota', 'assets/images/menu_derrota.png', { frameWidth: 128, frameHeight: 72 });

        this.load.image('ui_menu_controles', 'assets/images/menu_controles.png', { frameWidth: 128, frameHeight: 72 });
    }

    create() {
        this.anims.create({
            key: 'ui_menu_victoria',
            frames: this.anims.generateFrameNumbers('ui_menu_victoria', { start: 0, end: 33 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ui_menu_derrota',
            frames: this.anims.generateFrameNumbers('ui_menu_derrota', { start: 0, end: 38 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ui_menu_inicio',
            frames: this.anims.generateFrameNumbers('ui_menu_inicio', { start: 0, end: 39 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ui_creditos_menu',
            frames: this.anims.generateFrameNumbers('ui_creditos_menu', { start: 0, end: 47 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ui_menu_exit',
            frames: this.anims.generateFrameNumbers('ui_menu_exit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        menu_pausa.fondo = this.add.rectangle(0, 0, 1920, 1080, 0x000000).setOrigin(0, 0).setVisible(false).setAlpha(0);
        menu_pausa.menu = this.add.sprite(config.width / 2, config.height / 2, 'ui_menu_pausa').setOrigin(.5, .5).setVisible(false).setScale(.5);

        sprintBar.bar = this.add.sprite(20, 20, 'barrita').setOrigin(0, 0).setScale(5).setVisible(false);
        sprintBar.bar.alpha = 0.9;

        copas_ui.soporte = this.add.sprite(config.width - 20,100, 'ui_soporte_trofeos').setOrigin(1,0).setScale(4).setVisible(false);
        copas_ui.copa_3 = this.add.sprite(config.width - 20, 20, 'copa_mundo_spritesheet').setOrigin(1, 0).setScale(4).setVisible(false);
        copas_ui.copa_2 = this.add.sprite(config.width - 120, 20, 'copa_america_spritesheet').setOrigin(1, 0).setScale(4).setVisible(false);
        copas_ui.copa_1 = this.add.sprite(config.width - 220, 20, 'copa_libertadores_spritesheet').setOrigin(1, 0).setScale(4).setVisible(false);

        copas_dialogs.copa_1 = this.add.sprite(60, config.height / 2, 'req_libertadores').setOrigin(0, 1).setScale(4).setVisible(false);
        copas_dialogs.copa_2 = this.add.sprite(config.width/2 + 160, 20, 'req_america').setOrigin(1, 0).setScale(4).setVisible(false);
        copas_dialogs.copa_3 = this.add.sprite(config.width - 60, config.height / 2, 'req_mundo').setOrigin(1, 1).setScale(4).setVisible(false);

        barra_vida_jefe_progreso = this.add.rectangle(config.width / 2, 138, 756.2 / 2, 60, 0x526391).setOrigin(1, 1).setVisible(false);
        barra_vida_jefe = this.add.sprite(config.width / 2, 150, 'ui_vida_arquero').setOrigin(0.5, 1).setScale(2).setVisible(false);

        menu_controles.fondo = this.add.sprite(config.width/2, config.height/2, 'ui_menu_controles').setOrigin(.5, .5).setScale(15).setVisible(false);
        menu_controles.pelota = this.add.sprite(config.width/2, config.height/2, 'pelota').setOrigin(.5, .5).setScale(6).setVisible(false);

        menu_inicio.fondo_fondo = this.add.rectangle(0, 0, 1920, 1080, 0x000000).setOrigin(0, 0).setVisible(false).setAlpha(0);
        menu_inicio.fondo = this.add.sprite(config.width/2 - 1920, config.height/2, 'ui_menu_inicio').setOrigin(.5, .5).setScale(15).setVisible(false);
        menu_inicio.fondo.anims.play('ui_menu_inicio');

        menu_creditos.fondo = this.add.sprite(config.width/2 + 1920, config.height/2, 'ui_creditos_menu').setOrigin(.5, .5).setScale(15).setVisible(false);
        menu_creditos.boton_volver = this.add.sprite(config.width/2 + 1920, config.height/2, 'ui_menu_exit').setOrigin(.5, .5).setScale(8).setVisible(false);

        menu_derrota.fondo = this.add.sprite((config.width/2) - 1920, config.height/2, 'ui_menu_derrota').setOrigin(.5, .5).setScale(15).setVisible(true);

        menu_victoria.fondo = this.add.sprite((config.width/2) - 1920, config.height/2, 'ui_menu_victoria').setOrigin(.5, .5).setScale(15).setVisible(true);

        menu_inicio.boton_jugar = this.add.sprite((config.width/2 - 300 )- 1920, config.height/1.25, 'ui_menu_jugar').setOrigin(.5, .5).setScale(4).setVisible(false)
        .setInteractive().on('pointerover', function(pointer) {
            menu_inicio.boton_jugar.anims.play('ui_menu_jugar');
            menu_inicio.boton_jugar.tuin = sceneGlobal.tweens.addCounter({
                from: -15,
                to: 15,
                ease: 'Elastic',
                duration: 1000,
                repeat: -1,
                onUpdate: function(tween) {
                    menu_inicio.boton_jugar.y = Math.abs(tween.getValue()) + config.height/1.25;
                }
            }, this);
        }).on('pointerout', function(pointer) {
            menu_inicio.boton_jugar.tuin.stop();
            menu_inicio.boton_jugar.anims.stop();
            menu_inicio.boton_jugar.setFrame(0);
        }).on('pointerdown', function(pointer) {
            Interfaz.cambiarMusica("musica_1");
            menu_controles.fondo.setVisible(true);
            Interfaz.desactivar_controles_en(10);
            Interfaz.ocultar_menu_inicio();
            Interfaz.mostrar_todo();
        });
        menu_inicio.boton_creditos = this.add.sprite((config.width/2 + 400) - 1920, config.height/1.25, 'ui_menu_creditos').setOrigin(.5, .5).setScale(3).setVisible(false).setInteractive().on('pointerover', function(pointer) {
            menu_inicio.boton_creditos.anims.play('ui_menu_creditos');
            menu_inicio.boton_creditos.tuin = sceneGlobal.tweens.addCounter({
                from: -15,
                to: 15,
                ease: 'Elastic',
                duration: 1000,
                repeat: -1,
                onUpdate: function(tween) {
                    menu_inicio.boton_creditos.y = Math.abs(tween.getValue()) + config.height/1.25;
                }
            }, this);
        }).on('pointerout', function(pointer) {
            menu_inicio.boton_creditos.tuin.stop();
            menu_inicio.boton_creditos.anims.stop();
            menu_inicio.boton_creditos.setFrame(0);
        }).on('pointerdown', function(pointer) {
            Interfaz.mostrar_menu_creditos();
        });;

        menu_creditos.boton_volver.setInteractive().on('pointerover', function(pointer) {
            menu_creditos.boton_volver.anims.play('ui_menu_exit');
            menu_creditos.boton_volver.tuin = sceneGlobal.tweens.addCounter({
                from: -15,
                to: 15,
                ease: 'Elastic',
                duration: 1000,
                repeat: -1,
                onUpdate: function(tween) {
                    menu_creditos.boton_volver.y = Math.abs(tween.getValue()) + 67;
                }
            }, this);
        }).on('pointerout', function(pointer) {
            menu_creditos.boton_volver.tuin.stop();
            menu_creditos.boton_volver.anims.stop();
            menu_creditos.boton_volver.setFrame(0);
        }).on('pointerdown', function(pointer) {
            Interfaz.ocultar_menu_creditos();
        });;
        
        if (config.physics.arcade.debug) {
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
                vida_jefe = 0;
                
            }, this);
        }

        this.input.keyboard.on('keydown-' + 'ESC', function (event) {
            if (!menu_pausa_bool) {
                Interfaz.mostrar_menu_pausa();
            }else{
                Interfaz.ocultar_menu_pausa();
            }
        });

        // BORRAR TODO ESTO PARA EL ENTREGAR.
        if (config.physics.arcade.debug) {
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
        }
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

    static cambiarMusica(texto){
        if(musica){
            musica.stop();
        }
        musica = sceneGlobal.sound.add(texto, {volume: 0.2, loop: true});
        musica.play();
    }

    static play_sonido(key, tune = 0, volume = 1){
        sceneGlobal.sound.play(key, {
            volume: volume,
            detune: tune
        });
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

    static ocultar_todo_todo () {
        copas_dialogs.copa_1.visible = false;
        copas_dialogs.copa_2.visible = false;
        copas_dialogs.copa_3.visible = false;
        barra_vida_jefe.visible = false;
        barra_vida_jefe_progreso.visible = false;
        copas_ui.copa_1.visible = false;
        copas_ui.copa_2.visible = false;
        copas_ui.copa_3.visible = false;
        copas_ui.soporte.visible = false;
        sprintBar.bar.visible = false;
    }

    static mostrar_todo() {
        copas_ui.copa_1.visible = true;
        copas_ui.copa_2.visible = true;
        copas_ui.copa_3.visible = true;
        copas_ui.soporte.visible = true;
        sprintBar.bar.visible = true;
    }

    static mostrar_barra_vida_jefe() {
        barra_vida_jefe.visible = true;
        barra_vida_jefe_progreso.visible = true;
    }

    static desactivar_controles_en(segundos) {
        tweenTemp.forEach(t => t.pause());
        menu_pausa_bool = true;
        sceneGlobal.physics.pause()
        let pelota = menu_controles.pelota.setVisible(true);
        pelota.x = 200;
        pelota.y = config.height - 200;
        sceneGlobal.tweens.addCounter({
            from: 0,
            to: 20,
            duration: 1000 * segundos,
            ease: 'Power0',
            repeat: -1,
            yoyo: true,
            onUpdate: function (tween) {
                pelota.angle += tween.getValue();
            }
        });
        sceneGlobal.tweens.add({
            targets: pelota,
            x: 1920,
            duration: segundos * 1000,
            ease: 'Quad.easeIn',
            onComplete: () => {
                pelota.setVisible(false);

                sceneGlobal.tweens.add({
                    targets: menu_controles.fondo,
                    x: 1920*2,
                    duration: 1000,
                    ease: 'Power4',
                })

                tweenTemp.forEach(t => t.resume());
                sceneGlobal.physics.resume();
                menu_pausa_bool = false;
            }
        });
    }

    static mostrar_menu_creditos() {
        this.ocultar_todo();

        menu_creditos.fondo.visible = true;
        menu_creditos.fondo.anims.play('ui_creditos_menu', true);
        menu_creditos.boton_volver.visible = true;
        menu_creditos.boton_volver.x = config.width + 1920;
        menu_creditos.boton_volver.y = 67;

        menu_inicio.boton_creditos.visible = false;
        menu_inicio.boton_jugar.visible = false;

        sceneGlobal.tweens.add({
            targets: menu_creditos.fondo,
            x: config.width / 2,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,

        });

        sceneGlobal.tweens.add({
            targets: menu_creditos.boton_volver,
            x: config.width - 200,
            y : 67,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,

        });
    }

    static ocultar_menu_creditos() {
        this.ocultar_todo();

        menu_creditos.fondo.visible = true;
        menu_creditos.fondo.anims.play('ui_creditos_menu', true);
        menu_creditos.boton_volver.visible = true;
        menu_creditos.boton_volver.x = config.width;
        menu_creditos.boton_volver.y = 67;

        menu_inicio.boton_creditos.visible = true;
        menu_inicio.boton_jugar.visible = true;

        sceneGlobal.tweens.add({
            targets: menu_creditos.fondo,
            x: config.width * 2,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,

        });

        sceneGlobal.tweens.add({
            targets: menu_creditos.boton_volver,
            x: config.width + 300,
            y : 67,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,

        });
    }

    static mostrar_menu_inicio() {
        tweenTemp.forEach(t => t.pause());
        menu_pausa_bool = true;
        sceneGlobal.physics.pause()
        primeraVez = false;
        this.ocultar_todo();
        //menu_inicio.fondo.setDepth(5);
        menu_inicio.fondo.visible = true;
        menu_inicio.boton_jugar.visible = true;
        menu_inicio.boton_creditos.visible = true;
        menu_inicio.fondo_fondo.alpha = 1;
        menu_inicio.fondo_fondo.visible = true;
        sceneGlobal.tweens.add({
            targets: menu_inicio.fondo,
            x: config.width / 2,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,

        });
        sceneGlobal.tweens.add({
            targets: menu_inicio.boton_jugar,
            x: config.width / 2 - 300,
            duration: 1300,
            ease: 'Bounce',
            repeat: 0,

        });
        sceneGlobal.tweens.add({
            targets: menu_inicio.boton_creditos,
            x: config.width / 2 + 400,
            duration: 1200,
            ease: 'Bounce',
            repeat: 0,

        });
    }

    static mostrar_menu_ganaste() {
        //tweenTemp.forEach(t => t.pause());
        menu_pausa_bool = true;
        //sceneGlobal.physics.pause();
        menu_victoria.fondo.visible = true;

        sceneGlobal.tweens.add({
            targets: menu_victoria.fondo,
            x: config.width / 2,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,
            completeDelay: 10000,
            onComplete: () => {
                location.reload();
            }
        });
    }

    static ocultar_menu_inicio() {
        tweenTemp.forEach(t => t.resume());
        sceneGlobal.physics.resume();
        menu_pausa_bool = false;
        this.ocultar_todo();
        menu_inicio.fondo_fondo.alpha = 0;
        //menu_inicio.fondo.setDepth(5);
        sceneGlobal.tweens.add({
            targets: menu_inicio.fondo,
            x: (config.width / 2) - 2920,
            duration: 1000,
            ease: 'Bounce',
            repeat: 0,

        });
        sceneGlobal.tweens.add({
            targets: menu_inicio.boton_jugar,
            x: (config.width / 2 - 300) - 2920,
            duration: 1300,
            ease: 'Bounce',
            repeat: 0
        });
        sceneGlobal.tweens.add({
            targets: menu_inicio.boton_creditos,
            x: (config.width / 2 + 400) - 2920,
            duration: 1200,
            ease: 'Bounce',
            repeat: 0,
            
        });
        
    }

    static mostrar_menu_pausa() {
        menu_pausa_bool = true;
        sceneGlobal.physics.pause()
        tweenTemp.forEach(t => t.pause());
        menu_pausa.menu.y = -1000;
        menu_pausa.menu.visible = true;
        menu_pausa.fondo.visible = true;
        sceneGlobal.tweens.add({
            targets: menu_pausa.menu,
            y: config.height / 2,
            duration: 1000,
            ease: 'Elastic',
            repeat: 0,
            onStart: function () {
                menu_pausa_tweens = true;
            },
            onComplete: function () {
                menu_pausa_tweens = false;
            }
        });
        sceneGlobal.tweens.addCounter({
            from: 0,
            to: 0.5,
            ease: 'Power4',
            duration: 400,
            repeat: 0,
            onUpdate: function(tween) {
                menu_pausa.fondo.alpha = tween.getValue();
            }
        });
    }

    static mostrar_pantalla_derrota() {
        menu_derrota.fondo.x = (config.width/2) - 1920;
        menu_pausa_bool = true;
        sceneGlobal.physics.pause()
        tweenTemp.forEach(t => t.pause());
        menu_derrota.fondo.anims.play('ui_menu_derrota', false);
        sceneGlobal.tweens.add({
            targets: menu_derrota.fondo,
            x: (config.width/2),
            duration: 1000,
            ease: 'Power4',
            repeat: 0,
            completeDelay: 1200,
            onComplete: function () {
                tweenTemp.forEach(t => t.resume());
                sceneGlobal.physics.resume();
                menu_pausa_bool = false;
                sceneGlobal.tweens.add({
                    targets: menu_derrota.fondo,
                    x: (config.width/2) + (1920*2),
                    duration: 1500,
                    ease: 'Power4',
                    repeat: 0,
                });
            }
        });
    }

    static ocultar_menu_pausa() {
        if (!menu_pausa_tweens) {
            tweenTemp.forEach(t => t.resume());
            sceneGlobal.physics.resume();
            menu_pausa_bool = false;
            
            menu_pausa.menu.y = config.height / 2;
            sceneGlobal.tweens.add({
                targets: menu_pausa.menu,
                y: -1400,
                duration: 1000,
                ease: 'Linear',
                repeat: 0,
                onStart: function () {
                    menu_pausa_tweens = true;
                },
                onComplete: function () {
                    menu_pausa_tweens = false;
                }
            });
            sceneGlobal.tweens.addCounter({
                from: 0.5,
                to: 0,
                ease: 'Power4',
                duration: 400,
                repeat: 0,
                onUpdate: function(tween) {
                    menu_pausa.fondo.alpha = tween.getValue();
                }
            });
        }
    }
}
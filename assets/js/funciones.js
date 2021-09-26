let tweenTemp = [];
let pelotaPromise;

class Funciones {
    static rebotaObstaculo(pelota, obstaculo) {
        contador_dominio_pelota = 0;
        //sceneGlobal.sound.play("patada");
        //sceneGlobal.sound.play("emocion");
        let angulo;

        angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, obstaculo.x, obstaculo.y);

        let x = pelota.x + Math.cos(angulo) * -velocidad; 
        let y = pelota.y + Math.sin(angulo) * -velocidad;

        pelota.rotation = angulo - (Math.PI/2);

        tweenTemp.push(sceneGlobal.tweens.add({
            targets: pelota,
            paused: false,
            x: x,
            y: y,
            duration: 1500,
            ease: 'Power1',
            onStart: () => {
                pelota.anims.resume();
                pelota.anims.play("pelota_gira", true);
            },
            onComplete: () => {
                pelota.anims.pause();
            }
        }));

        //tweenTemp.stop();

        //pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
        //pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
    }

    static patear(pelota, jugador) {
        if (dominio_de_la_pelota != "enemigo") {
            dominio_de_la_pelota = "player";
            contador_dominio_pelota = 0;
            //sceneGlobal.sound.play("patada");
            //sceneGlobal.sound.play("emocion");
            let angulo;

            angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, jugador.x, jugador.y);

            let x = pelota.x + Math.cos(angulo) * -velocidad; 
            let y = pelota.y + Math.sin(angulo) * -velocidad;

            pelota.rotation = angulo - (Math.PI/2);

            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelota,
                paused: false,
                x: x,
                y: y,
                duration: 1500,
                ease: 'Power1',
                onStart: () => {
                    pelota.anims.resume();
                    pelota.anims.play("pelota_gira", true);
                },
                onComplete: () => {
                    pelota.anims.pause();
                }
            }));

            //tweenTemp.stop();

            //pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
            //pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
        }else {
            console.log("te fajaron");
        }
    }

    static patearEnemigo(pelota, enemies) {
        if (dominio_de_la_pelota != "player") {
            dominio_de_la_pelota = "enemigo";
            contador_dominio_pelota = 0;
            //sceneGlobal.sound.play("patada");
            //sceneGlobal.sound.play("emocion");
            let angulo;

            angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, enemies.x, enemies.y);

            let x = pelota.x + Math.cos(angulo) * -500; 
            let y = pelota.y + Math.sin(angulo) * -500;   

            let ang_empuje = Phaser.Math.Angle.Between(pelota.x, pelota.y, enemies.x, enemies.y);

            enemies.setVelocity(Math.cos(ang_empuje) * -400, Math.sin(ang_empuje) * -400);

            let ang_rebote = Math.atan2(enemies.body.velocity.x/300, enemies.body.velocity.y/(-300));
            enemies.rotation = ang_rebote;
            pelota.rotation = angulo - (Math.PI/2);

            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelota,
                paused: false,
                x: x,
                y: y,
                duration: 1000,
                ease: 'Power1',
                onStart: () => {
                    pelota.anims.resume();
                    pelota.anims.play("pelota_gira", true);
                },
                onComplete: () => {
                    dominio_de_la_pelota = "nadie";
                    pelota.anims.pause();
                }
            }));

            //tweenTemp.stop();

            //pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
            //pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
        }else if (dominio_de_la_pelota == "player") {
            enemies.setVelocity(0,0);
            enemies.destroy();
            enemigos_vivos--;
        }
    }

    static patearEnemigoGrande(pelota, enemies) {
        if (dominio_de_la_pelota != "player") {
            enemies.setVelocity(0,0);
            dominio_de_la_pelota = "enemigo";
            contador_dominio_pelota = 0;
            //sceneGlobal.sound.play("patada");
            //sceneGlobal.sound.play("emocion");
            let angulo;

            angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, enemies.x, enemies.y);

            let x = pelota.x + Math.cos(angulo) * -1000; 
            let y = pelota.y + Math.sin(angulo) * -1000;   

            //enemies.setVelocity(Math.cos(ang_empuje) * -400, Math.sin(ang_empuje) * -400);

            let ang_rebote = Math.atan2(enemies.body.velocity.x/300, enemies.body.velocity.y/(-300));
            enemies.rotation = angulo - (Math.PI/2);
            pelota.rotation = angulo - (Math.PI/2);

            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelota,
                paused: false,
                x: x,
                y: y,
                duration: 1000,
                ease: 'Power1',
                onStart: () => {
                    pelota.anims.resume();
                    pelota.anims.play("pelota_gira", true);
                },
                onComplete: () => {
                    pelota.anims.pause();
                    dominio_de_la_pelota = "nadie";
                }
            }));

            enemies.anims.pause();
            new Promise(function(resolve, reject) {
                resolve(
                    setTimeout(function() {
                        let angle = Phaser.Math.Angle.Between(enemies.x, enemies.y, pelota.x, pelota.y) + Phaser.Math.FloatBetween(-.3, .3);
                        enemies.rotation = angle + (Math.PI/2);
                        enemies.anims.resume();
                        enemies.setVelocity(Math.cos(angle) * 800, Math.sin(angle) * 800);
                    }, 4000)
                )
            });

            //tweenTemp.stop();

            //pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
            //pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
        }else if (dominio_de_la_pelota == "player") {
            enemies.setVelocity(0,0);
            enemies.destroy();
            enemigos_vivos--;
        }
    }

    static initPelota(scene, pos = {x: config.width / 2, y: config.height / 2}) {  
        pelota = scene.physics.add.sprite(pos.x, pos.y, "pelota")
            .setScale(4)
            .setCollideWorldBounds(true)
            .setCircle(8)
            .setImmovable(true)
            .setOffset(7.75, 7.75);
            
        pelota.body.moves = false;
        pelota.body.setDrag(0, 0);
    }

    static initJugador(scene) {
        sceneGlobal.emitter=EventDispatcher.getInstance();
        sceneGlobal.emitter.off("abrir_puertas");

        enemigos_vivos = 0;
        jugador = scene.physics.add
            .sprite(posicion_inicio.x, posicion_inicio.y, "personaje")
            .setCollideWorldBounds(true)
            .setScale(4);
    }

    static initEnemigo(scene, rotacion, posicion) {
        if (progreso_del_juego[scene.sys.config] == 0) {
            enemigo = scene.physics.add
                .sprite(posicion.x, posicion.y, "enemigo_1")
                .setCollideWorldBounds(true)
                .setScale(3);
            enemigo.rotation = rotacion;
            enemigo.setVelocity(300,-300);
            enemigo.setBounce(1);
            enemigo.anims.play("enemigo_moverse");
            enemigos.push(enemigo);
            enemigos_vivos++;
        }
    }

    static initEnemigoGrandote(scene, rotacion, posicion) {
        if (progreso_del_juego[scene.sys.config] == 0) {
            let enemigo = scene.physics.add
                .sprite(posicion.x, posicion.y, "enemigo_1")
                .setCollideWorldBounds(true)
                .setScale(5);
            let angle = Phaser.Math.Angle.Between(enemigo.x, enemigo.y, pelota.x, pelota.y);
            enemigo.rotation = angle + (Math.PI/2);
            enemigo.setBounce(1);
            enemigo.anims.play("enemigo_moverse");
            enemigo.anims.pause();
            new Promise(function(resolve, reject) {
                resolve(
                    setTimeout(function() {
                        let angle = Phaser.Math.Angle.Between(enemigo.x, enemigo.y, pelota.x, pelota.y);
                        enemigo.rotation = angle + (Math.PI/2);
                        enemigo.anims.resume();
                        enemigo.setVelocity(Math.cos(angle) * 800, Math.sin(angle) * 800);
                    }, 4000)
                )
            });
            enemigos_grandes.push(enemigo);
            enemigos_vivos++;
        }
    }

    static initInputs(scene) {
        scene.input.keyboard
            .on("keydown-W", () => {
                keyUp = true;
            })
            .on("keyup-W", () => {
                keyUp = false;
            })
            .on("keydown-A", () => {
                keyLeft = true;
            })
            .on("keyup-A", () => {
                keyLeft = false;
            })
            .on("keydown-D", () => {
                keyRight = true;
            })
            .on("keyup-D", () => {
                keyRight = false;
            })
            .on("keydown-S", () => {
                keyDown = true;
            })
            .on("keyup-S", () => {
                keyDown = false;
            })
            .on("keydown-SHIFT", () => {
                sprint = true;
            })
            .on("keyup-SHIFT", () => {
                sprint = false;
            });
    }

    static updateJugador(scene, jugador, delta) {
        if (enemigos_vivos <= 0) {
            this.emitter=EventDispatcher.getInstance();
            this.emitter.emit("abrir_puertas")
        }

        if (contador_dominio_pelota >= 4) {
            dominio_de_la_pelota = "nadie";
        }else {
            contador_dominio_pelota += delta*.005;
        }

        sprintBar.progress = Phaser.Math.Clamp(Math.round(stamina/11.11), 0, 9);

        if(sprint && stamina > 5){
            velocidad = velocidad_sprintando;
        }else{
            velocidad = velocidad_caminando;
        }

        if (keyUp || keyDown || keyLeft || keyRight) { 
            jugador.anims.play("caminar", true);
            if (keyUp) {
                if (keyLeft) {
                    jugador.setVelocityY(-velocidad/1.5);
                    jugador.setVelocityX(-velocidad/1.5);
                } else if (keyRight) {
                    jugador.setVelocityY(-velocidad/1.5);
                    jugador.setVelocityX(velocidad/1.5);
                } else {
                    jugador.setVelocity(0, -velocidad);
                }
            }
            else if (keyDown) {
                if (keyLeft) {
                    jugador.setVelocityY(velocidad/1.5);
                    jugador.setVelocityX(-velocidad/1.5);
                } else if (keyRight) {
                    jugador.setVelocityY(velocidad/1.5);
                    jugador.setVelocityX(velocidad/1.5);
                } else {
                    jugador.setVelocity(0, velocidad);
                }
            }
            else if (keyLeft) {
                jugador.setVelocity(-velocidad, 0);
            }
            else if (keyRight) {
                jugador.setVelocity(velocidad, 0);
            }
        }else{
            jugador.setVelocity(0, 0);
            jugador.anims.stop();
        }

        // derecha
        if (jugador.body.velocity.x > 0) {
            if (jugador.body.velocity.y > 0) {
                jugador.rotation = Math.PI / 2 + (Math.PI / 4);
            }else if (jugador.body.velocity.y < 0) {
                jugador.rotation = Math.PI / 4;
            }else {
                jugador.rotation = Math.PI / 2;
            }
        }else if (jugador.body.velocity.x < 0) {
            if (jugador.body.velocity.y > 0) {
                jugador.rotation = -Math.PI / 2 - (Math.PI / 4);
            }else if (jugador.body.velocity.y < 0) {
                jugador.rotation = -Math.PI / 4;
            }else {
                jugador.rotation = -Math.PI / 2;
            }
        }else if (jugador.body.velocity.y > 0) {
            jugador.rotation = Math.PI;
        }else if (jugador.body.velocity.y < 0) {
            jugador.rotation = 0;
        }

        //console.log(stamina);

        if (sprint) {
            if (stamina > 0) {
                stamina -= delta * .05;
            }
        }else {
            if (stamina < 100) {
                stamina += delta * .03;
            }
        }
    }

    static updateEnemigo(scene, enemy){
        
    }

    static initBordes(scene, offsets_fuera={derecha:{x:0, y:0}, izquierda:{x:0, y:0}}) {
        let bordes = scene.physics.add.group();
        bordes.create(101 + offsets_fuera.izquierda.x, 101 + offsets_fuera.izquierda.y, "vertical").setOrigin(0).refreshBody().setVisible(false).setImmovable(true);
        bordes.create(1821 + offsets_fuera.derecha.x, 101 + offsets_fuera.derecha.y, "vertical").setOrigin(0).refreshBody().setVisible(false).setImmovable(true);
        bordes.create(101, 101, "horizontal").setOrigin(0).refreshBody().setVisible(false).setImmovable(true);
        bordes.create(101, 981, "horizontal").setOrigin(0).refreshBody().setVisible(false).setImmovable(true);
        bordes.name = "bordes";

        fuera_linea_offsets = offsets_fuera;

        obstaculos.push(bordes);

        scene.physics.add.collider(bordes, pelota, this.fueraLinea, null, scene);
        //scene.physics.add.collider(bordes, enemigo, this.rotarEnemigo, null, scene);
    }

    static updatePelota(scene, pelota) {
        // if (pelota.body.velocity.x != 0 || pelota.body.velocity.y != 0) {
        //     pelota.anims.play("pelota_gira", true);
        //     pelota.anims.frame = pelota.body.velocity.x;
        //     //pelota.rotation = Math.atan2(pelota.body.velocity.y, pelota.body.velocity.x) - Math.PI / 2;
        // }else {
        //     pelota.anims.pause();
        // }
        if (dominio_de_la_pelota == "player") {
            pelota.setTint(0x00ff00);
        }else if (dominio_de_la_pelota == "enemigo") {
            pelota.setTint(0xff0000);
        }else if (dominio_de_la_pelota == "nadie") {
            pelota.setTint(0x0000ff);
        }
    }

    static rotarEnemigo(enemis, cualquiercosa){
        let ang_rebote = Math.atan2(enemis.body.velocity.x/300, enemis.body.velocity.y/(-300));
        enemis.rotation = ang_rebote;
    }

    static rotarEnemigoGrande(enemis, cualquiercosa){
        let ang_rebote = Phaser.Math.Angle.Between(enemis.x, enemis.y, pelota.x, pelota.y);
        enemis.setVelocity(0);
        enemis.rotation = ang_rebote + (Math.PI/2);
        enemis.anims.pause();
        new Promise(function(resolve, reject) {
            resolve(
                setTimeout(function() {
                    let angle = Phaser.Math.Angle.Between(enemis.x, enemis.y, pelota.x, pelota.y) + Phaser.Math.FloatBetween(-.3, .3);
                    enemis.rotation = angle + (Math.PI/2);
                    enemis.anims.resume();
                    enemis.setVelocity(Math.cos(angle) * 800, Math.sin(angle) * 800);
                }, 4000)
            )
        });
    }

    static pelotaObstaculo(pelota, obstaculo){
        tweenTemp.forEach(t => t.stop());
        Funciones.patear(pelota, obstaculo);
    }

    static fueraLinea(pelotis, bordis){
        dominio_de_la_pelota = "nadie";
        //sceneGlobal.sound.play("silbato");
        //sceneGlobal.sound.play("patada");
        //pelotis.tween.restart();
        tweenTemp.forEach(t => t.stop());
        // pelotis.tween.remove();
        if(pelotis.x > (config.width/2) + ((fuera_linea_offsets.derecha.x + fuera_linea_offsets.izquierda.x)/4)){
            var _= sceneGlobal.add.sprite(50 + fuera_linea_offsets.izquierda.x,(config.height/2) + fuera_linea_offsets.izquierda.y,"personaje_fuera").setScale(4);
            _.rotation = Math.PI/2;
            _.anims.play("personaje_fuera", false);
            new Promise(
                function(resolve) {  
                    setTimeout(function(){
                        _.destroy();
                        resolve();
                    }, 2000);
            });
            let velocidad = 650 - Math.abs(((fuera_linea_offsets.derecha.x + fuera_linea_offsets.izquierda.x)/16));
            pelotis.x = (250) + fuera_linea_offsets.izquierda.x;
            pelotis.y = (config.height/2) + fuera_linea_offsets.izquierda.y;
            let angulo = Phaser.Math.Angle.Between(pelotis.x, pelotis.y, velocidad + fuera_linea_offsets.izquierda.x, (config.height/2) + fuera_linea_offsets.izquierda.y);
            pelotis.angle = angulo - 90;
            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelotis,
                paused: false,
                x: velocidad + fuera_linea_offsets.izquierda.x,
                y: (config.height/2) + fuera_linea_offsets.izquierda.y,
                duration: 1500,
                ease: 'Power1',
                onStart: () => {
                    pelota.anims.resume();
                    pelota.anims.play("pelota_gira", true);
                },
                onComplete: () => {
                    pelota.anims.pause();
                    dominio_de_la_pelota = "nadie";
                }
            }));
        }else {
            var _= sceneGlobal.add.sprite((config.width - 50) + fuera_linea_offsets.derecha.x,(config.height/2) + fuera_linea_offsets.derecha.y,"personaje_fuera").setScale(4);
            _.rotation = -Math.PI/2;
            _.anims.play("personaje_fuera", false);
            new Promise(
                function(resolve) {  
                    setTimeout(function(){
                        _.destroy();
                        resolve();
                    }, 2000);
            });
            pelotis.x = (config.width - 250) + fuera_linea_offsets.derecha.x;
            pelotis.y = (config.height/2) + fuera_linea_offsets.derecha.y;
            let velocidad = 650 - Math.abs(((fuera_linea_offsets.derecha.x + fuera_linea_offsets.izquierda.x)/16));
            let angulo = Phaser.Math.Angle.Between(pelotis.x, pelotis.y, (config.width - velocidad) + fuera_linea_offsets.derecha.x, (config.height/2) + fuera_linea_offsets.derecha.y);
            pelotis.angle = angulo - 90;
            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelotis,
                paused: false,
                x: (config.width - velocidad) + fuera_linea_offsets.derecha.x,
                y: (config.height/2) + fuera_linea_offsets.derecha.y,
                duration: 1500,
                ease: 'Power1',
                onStart: () => {
                    pelota.anims.resume();
                    pelota.anims.play("pelota_gira", true);
                },
                onComplete: () => {
                    pelota.anims.pause();
                    dominio_de_la_pelota = "nadie";
                }
            }));
        }
    }

    static arbitro_arriba(scene, nivel_siguiente = "nivel_3", offsets = {x:0, y:0}, offset_jugador = {x:0, y:0}, copa_requerida = {req: false, copa: "copa_1"}) {
        let lvl_nuevo = scene.add.rectangle(960 + offsets.x, 0 + offsets.y, 250, 60, 0xffffff);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        lvl_nuevo.posicion_inicio = {x: 960 + offset_jugador.x, y: 900 + offset_jugador.y};

        scene.emitter=EventDispatcher.getInstance();
        let puerta = scene.add.sprite(960 + offsets.x, -110 + offsets.y, "no_puerta").setOrigin(0.5, 0).setScale(8);

        if (copa_requerida.req) {
            lvl_nuevo.copa_requerida = copa_requerida.copa;
            puerta.setTint(0xff0000);
            if (copas[copa_requerida.copa] == true) {
                scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
            }
        }else {
            scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
        }

        scene.emitter.on('abrir_puertas', function (e) { 
            progreso_del_juego[scene.sys.config] = 1;
            if (copas[copa_requerida.copa] == true || copa_requerida.req == false) {
                puerta.anims.play("no_puerta", false); 
            }
            enemigos_vivos = 99;
        });
    }
    static arbitro_izquierda(scene, nivel_siguiente = "nivel_3", offsets = {x:0, y:0}, offset_jugador = {x:0, y:0}, copa_requerida = {req: false, copa: "copa_1"}) {
        let lvl_nuevo = scene.add.rectangle(30 + offsets.x, 400 + offsets.y, 58, 243, 0xffffff).setOrigin(0, 0);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        lvl_nuevo.posicion_inicio = {x: 1740 + offset_jugador.x, y: 540 + offset_jugador.y};
        
        sceneGlobal.emitter=EventDispatcher.getInstance();
        let puerta = sceneGlobal.add.sprite(40 + offsets.x, config.height/2 + offsets.y, "no_puerta").setOrigin(.5, .5).setScale(8).setRotation(-Math.PI/2);

        if (copa_requerida.req) {
            lvl_nuevo.copa_requerida = copa_requerida.copa;
            puerta.setTint(0xff0000);
            if (copas[copa_requerida.copa] == true) {
                scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
            }
        }else {
            scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
        }

        sceneGlobal.emitter.on('abrir_puertas', function (e) {
            progreso_del_juego[scene.sys.config] = 1; 
            if (copas[copa_requerida.copa] == true || copa_requerida.req == false) {
                puerta.anims.play("no_puerta", false); 
            }
            enemigos_vivos = 99;
        });
    }
    static arbitro_derecha(scene, nivel_siguiente = "nivel_3", offsets = {x:0, y:0}, offset_jugador = {x:0, y:0}, copa_requerida = {req: false, copa: "copa_1"}) {
        let lvl_nuevo = scene.add.rectangle(1820 + offsets.x, 432 + offsets.y, 74, 193, 0xffffff).setOrigin(0, 0);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        lvl_nuevo.posicion_inicio = {x: 180 + offset_jugador.x, y: 540 + offset_jugador.y};

        sceneGlobal.emitter=EventDispatcher.getInstance();
        let puerta = sceneGlobal.add.sprite((config.width - 40) + offsets.x, config.height/2 + offsets.y, "no_puerta").setOrigin(.5, .5).setScale(8).setRotation(Math.PI/2);

        if (copa_requerida.req) {
            lvl_nuevo.copa_requerida = copa_requerida.copa;
            puerta.setTint(0xff0000);
            if (copas[copa_requerida.copa] == true) {
                scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
            }
        }else {
            scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
        }

        sceneGlobal.emitter.on('abrir_puertas', function (e) { 
            progreso_del_juego[scene.sys.config] = 1;
            if (copas[copa_requerida.copa] == true || copa_requerida.req == false) {
                puerta.anims.play("no_puerta", false); 
            } 
            enemigos_vivos = 99;
        });
    }
    static arbitro_abajo(scene, nivel_siguiente = "nivel_3", offsets = {x:0, y:0}, offset_jugador = {x:0, y:0}, copa_requerida = {req: false, copa: "copa_1"}) {
        let lvl_nuevo = scene.add.rectangle(844 + offsets.x, 983 + offsets.y, 240,  78, 0xffffff).setOrigin(0, 0);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.posicion_inicio = {x: 960 + offset_jugador.x, y: 180 + offset_jugador.y};
        lvl_nuevo.body.moves = false;

        sceneGlobal.emitter=EventDispatcher.getInstance();
        let puerta = sceneGlobal.add.sprite(960 + offsets.x, (config.height - 40) + offsets.y, "no_puerta").setOrigin(.5, .5).setScale(8).setRotation(-Math.PI);

        if (copa_requerida.req) {
            lvl_nuevo.copa_requerida = copa_requerida.copa;
            puerta.setTint(0xff0000);
            if (copas[copa_requerida.copa] == true) {
                scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
            }
        }else {
            scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);
        }

        sceneGlobal.emitter.on('abrir_puertas', function (e) { 
            progreso_del_juego[scene.sys.config] = 1;
            if (copas[copa_requerida.copa] == true || copa_requerida.req == false) {
                puerta.anims.play("no_puerta", false); 
            }
            enemigos_vivos = 99;
        });
    }

    static cambiarNivel(uno, dos){
        if (enemigos_vivos != 99) return;
        posicion_inicio = dos.posicion_inicio;
        this.scene.start(dos.lvl_siguiente);
    }
}
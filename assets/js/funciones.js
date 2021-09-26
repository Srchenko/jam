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
                onComplete: () => {
                    dominio_de_la_pelota = "nadie";
                }
            }));

            //tweenTemp.stop();

            //pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
            //pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
        }else if (dominio_de_la_pelota == "player") {
            console.log("lo fajaste");
        }
    }

    static patearEnemigoGrande(pelota, enemies) {
        if (dominio_de_la_pelota != "player") {
            enemigo.setVelocity(0,0);
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
                onComplete: () => {
                    dominio_de_la_pelota = "nadie";
                }
            }));

            enemigo.anims.pause();
            new Promise(function(resolve, reject) {
                resolve(
                    setTimeout(function() {
                        let angle = Phaser.Math.Angle.Between(enemigo.x, enemigo.y, pelota.x, pelota.y) + Phaser.Math.FloatBetween(-.3, .3);
                        enemigo.rotation = angle + (Math.PI/2);
                        enemigo.anims.resume();
                        enemigo.setVelocity(Math.cos(angle) * 800, Math.sin(angle) * 800);
                    }, 4000)
                )
            });

            //tweenTemp.stop();

            //pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
            //pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
        }else if (dominio_de_la_pelota == "player") {
            enemigo.setVelocity(0,0);
            enemigo.destroy();
            enemigos_vivos--;
        }
    }

    static initPelota(scene) {
        pelota = scene.physics.add.sprite(config.width / 2, config.height / 2, "pelota")
            .setScale(4)
            .setCollideWorldBounds(true)
            .setCircle(8)
            .setImmovable(true)
            .setOffset(7.75, 7.75);
            
        pelota.body.moves = false;
        pelota.body.setDrag(0, 0);
    }

    static initJugador(scene) {
        jugador = scene.physics.add
            .sprite(config.width / 2, config.height, "personaje")
            .setCollideWorldBounds(true)
            .setScale(4);
    }

    static initEnemigo(scene, rotacion, posicion) {
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

    static initEnemigoGrandote(scene, rotacion, posicion) {
        enemigo = scene.physics.add
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

        if (contador_dominio_pelota >= 3) {
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

    static initBordes(scene) {
        let bordes = scene.physics.add.group();
        bordes.create(101, 101, "vertical").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(1821, 101, "vertical").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(101, 101, "horizontal").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(101, 981, "horizontal").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.name = "bordes";

        obstaculos.push(bordes);

        console.log(bordes);

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
        enemigo.anims.pause();
        new Promise(function(resolve, reject) {
            resolve(
                setTimeout(function() {
                    let angle = Phaser.Math.Angle.Between(enemigo.x, enemigo.y, pelota.x, pelota.y) + Phaser.Math.FloatBetween(-.3, .3);
                    enemigo.rotation = angle + (Math.PI/2);
                    enemigo.anims.resume();
                    enemigo.setVelocity(Math.cos(angle) * 800, Math.sin(angle) * 800);
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
        if(pelotis.x > config.width/2){
            var _= sceneGlobal.add.sprite(50,config.height/2,"personaje_fuera").setScale(4);
            _.rotation = Math.PI/2;
            _.anims.play("personaje_fuera", false);
            new Promise(
                function(resolve) {  
                    setTimeout(function(){
                        _.destroy();
                        resolve();
                    }, 2000);
            });
            let angulo = Phaser.Math.Angle.Between(pelotis.x, pelotis.y, 650, config.height/2);
            pelotis.angle = angulo - 90;
            pelotis.x = 250;
            pelotis.y = config.height/2;
            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelotis,
                paused: false,
                x: 650,
                y: config.height/2,
                duration: 1500,
                ease: 'Power1',
                onComplete: () => {
                    dominio_de_la_pelota = "nadie";
                }
            }));
        }else {
            var _= sceneGlobal.add.sprite(config.width - 50,config.height/2,"personaje_fuera").setScale(4);
            _.rotation = -Math.PI/2;
            _.anims.play("personaje_fuera", false);
            new Promise(
                function(resolve) {  
                    setTimeout(function(){
                        _.destroy();
                        resolve();
                    }, 2000);
            });
            let angulo = Phaser.Math.Angle.Between(pelotis.x, pelotis.y, config.width - 650, config.height/2);
            pelotis.angle = angulo - 90;
            pelotis.x = config.width - 250;
            pelotis.y = config.height/2;
            tweenTemp.push(sceneGlobal.tweens.add({
                targets: pelotis,
                paused: false,
                x: config.width - 650,
                y: config.height/2,
                duration: 1500,
                ease: 'Power1',
                onComplete: () => {
                    dominio_de_la_pelota = "nadie";
                }
            }));
        }
    }

    static arbitro_arriba(scene, nivel_siguiente = "nivel_3") {
        let lvl_nuevo = scene.add.rectangle(960, 0, 250, 60, 0xffffff);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);

        scene.emitter=EventDispatcher.getInstance();
        let puerta = scene.add.sprite(960, -110, "no_puerta").setOrigin(0.5, 0).setScale(8);
        scene.emitter.on('abrir_puertas', function (e) { 
            puerta.anims.play("no_puerta", false); 
            enemigos_vivos = 99;
        });
    }
    static arbitro_izquierda(scene, nivel_siguiente = "nivel_3") {
        let lvl_nuevo = scene.add.rectangle(30, 400, 58, 243, 0xffffff).setOrigin(0, 0);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);

        sceneGlobal.emitter=EventDispatcher.getInstance();
        let puerta = sceneGlobal.add.sprite(40, config.height/2, "no_puerta").setOrigin(.5, .5).setScale(8).setRotation(-Math.PI/2);
        sceneGlobal.emitter.on('abrir_puertas', function (e) { 
            puerta.anims.play("no_puerta", false); 
            enemigos_vivos = 99;
        });
    }
    static arbitro_derecha(scene, nivel_siguiente = "nivel_3") {
        let lvl_nuevo = scene.add.rectangle(1820, 432, 74, 193, 0xffffff).setOrigin(0, 0);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);

        sceneGlobal.emitter=EventDispatcher.getInstance();
        let puerta = sceneGlobal.add.sprite(config.width - 40, config.height/2, "no_puerta").setOrigin(.5, .5).setScale(8).setRotation(Math.PI/2);
        sceneGlobal.emitter.on('abrir_puertas', function (e) { 
            puerta.anims.play("no_puerta", false); 
            enemigos_vivos = 99;
        });
    }
    static arbitro_abajo(scene, nivel_siguiente = "nivel_3") {
        let lvl_nuevo = scene.add.rectangle(844, 983, 240,  78, 0xffffff).setOrigin(0, 0);
        let lvl_obj = scene.physics.add.existing(lvl_nuevo);
        lvl_nuevo.visible = false;
        lvl_nuevo.lvl_siguiente = nivel_siguiente;
        lvl_nuevo.body.moves = false;
        scene.physics.add.collider(jugador, lvl_obj, this.cambiarNivel, null, scene);

        sceneGlobal.emitter=EventDispatcher.getInstance();
        let puerta = sceneGlobal.add.sprite(960, config.height - 40, "no_puerta").setOrigin(.5, .5).setScale(8).setRotation(-Math.PI);
        sceneGlobal.emitter.on('abrir_puertas', function (e) { 
            puerta.anims.play("no_puerta", false); 
            enemigos_vivos = 99;
        });
    }

    static cambiarNivel(uno, dos){
        if (enemigos_vivos != 99) return;
        this.scene.start(dos.lvl_siguiente);
    }
}
let tweenTemp = [];

class Funciones {
    static patear(pelota, jugador) {
        //sceneGlobal.sound.play("patada");
        //sceneGlobal.sound.play("emocion");
        let angulo;

        angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, jugador.x, jugador.y);

        let x = pelota.x + Math.cos(angulo) * -velocidad; 
        let y = pelota.y + Math.sin(angulo) * -velocidad;

        pelota.rotation = angulo - (Math.PI/2);

        console.log("tween");
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

    static patearEnemigo(pelota, enemies) {
        //sceneGlobal.sound.play("patada");
        //sceneGlobal.sound.play("emocion");
        let angulo;

        angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, enemies.x, enemies.y);

        let x = pelota.x + Math.cos(angulo) * -velocidad; 
        let y = pelota.y + Math.sin(angulo) * -velocidad;   

        let ang_empuje = Phaser.Math.Angle.Between(pelota.x, pelota.y, enemies.x, enemies.y);

        enemies.setVelocity(Math.cos(ang_empuje) * -300, Math.sin(ang_empuje) * -300);

        let ang_rebote = Math.atan2(enemies.body.velocity.x/300, enemies.body.velocity.y/(-300));
        enemies.rotation = ang_rebote;
        pelota.rotation = angulo - (Math.PI/2);

        console.log("tween");
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

    static initPelota(scene) {
        pelota = scene.physics.add.sprite(config.width / 2, config.height / 2, "pelota")
            .setScale(4)
            .setCollideWorldBounds(true)
            .setCircle(8)
            .setImmovable(true)
            .setOffset(7.5, 7.5);
            
        pelota.body.moves = false;
        pelota.body.setDrag(0, 0);
    }

    static initJugador(scene) {
        jugador = scene.physics.add
            .sprite(config.width / 2, config.height, "personaje")
            .setCollideWorldBounds(true)
            .setScale(4);
    }

    static initEnemigo(scene, rotacion, velocidad) {
        enemigo = scene.physics.add
            .sprite(config.width / 2 + 50, config.height / 2 - 100, "enemigo_1")
            .setCollideWorldBounds(true)
            .setScale(3);
        enemigo.rotation = rotacion;
        enemigo.setVelocity(300,-300);
        enemigo.setBounce(1);
        enemigo.anims.play("enemigo_moverse");
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

        scene.physics.add.collider(bordes, pelota, this.fueraLinea, null, scene);
        scene.physics.add.collider(bordes, enemigo, this.rotarEnemigo, null, scene);
    }

    static updatePelota(scene, pelota) {
        if (pelota.body.velocity.x != 0 || pelota.body.velocity.y != 0) {
            pelota.anims.play("pelota_gira", true);
            pelota.anims.frame = pelota.body.velocity.x;
            //pelota.rotation = Math.atan2(pelota.body.velocity.y, pelota.body.velocity.x) - Math.PI / 2;
        }else {
            pelota.anims.pause();
        }
    }

    static rotarEnemigo(enemis, cualquiercosa){
        let ang_rebote = Math.atan2(enemis.body.velocity.x/300, enemis.body.velocity.y/(-300));
        enemis.rotation = ang_rebote;
    }

    static pelotaObstaculo(pelota, obstaculo){
        tweenTemp.forEach(t => t.stop());
        Funciones.patear(pelota, obstaculo);
    }

    static fueraLinea(pelotis, bordis){
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
            }));
        }
    }
}
class Funciones {
    static patear(pelota, jugador) {
        sceneGlobal.sound.play("patada");
        sceneGlobal.sound.play("emocion");
        let angulo;

        angulo = Phaser.Math.Angle.Between(pelota.x, pelota.y, jugador.x, jugador.y);

        pelota.body.velocity.y = Math.sin(angulo) * -velocidad * 2; 
        pelota.body.velocity.x = Math.cos(angulo) * -velocidad * 2;
    }

    static initPelota(scene) {
        pelota = scene.physics.add.sprite(config.width / 2, config.height / 2, "pelota")
            .setScale(4)
            .setCollideWorldBounds(true)
            .setCircle(8)
            .setOffset(7.5, 7.5);
            
        pelota.body.setDrag(200, 200);
    }

    static initJugador(scene) {
        jugador = scene.physics.add
            .sprite(config.width / 2, config.height, "personaje")
            .setCollideWorldBounds(true)
            .setScale(4);
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
        sprintBar.progress = Phaser.Math.Clamp(Math.round(stamina/1000), 0, 9);

        if(sprint && stamina > 5000){
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

        if (sprint) {
            if (stamina > -5) {
                stamina -= delta*.05;
            }
        }else {
            if (stamina < 10000) {
                stamina += delta * .01;
            }
        }
    }

    static initBordes(scene) {
        let bordes = scene.physics.add.group();
        bordes.create(101, 101, "vertical").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(1821, 101, "vertical").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(101, 101, "horizontal").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);
        bordes.create(101, 981, "horizontal").setOrigin(0).refreshBody().setVisible(true).setImmovable(true);

        scene.physics.add.collider(bordes, pelota, this.fueraLinea, null, scene);
    }

    static updatePelota(scene, pelota) {
        if (pelota.body.velocity.x != 0 || pelota.body.velocity.y != 0) {
            pelota.anims.play("pelota_gira", true);
            pelota.anims.frame = pelota.body.velocity.x;
            pelota.rotation = Math.atan2(pelota.body.velocity.y, pelota.body.velocity.x) - Math.PI / 2;
        }else {
            pelota.anims.pause();
        }
    }

    static fueraLinea(pelotis, bordis){
        sceneGlobal.sound.play("silbato");
        sceneGlobal.sound.play("patada");
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
            pelotis.setVelocity(0);
            pelotis.x = 150;
            pelotis.y = config.height/2;
            pelotis.setVelocityX(300);
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
            pelotis.setVelocity(0);
            pelotis.x = config.width - 150;
            pelotis.y = config.height/2;
            pelotis.setVelocityX(-300);
        }
    }
}
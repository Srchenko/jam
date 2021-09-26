const EVENT_ABRIR_PUERTAS = new Event('abrir_puertas');

let sceneGlobal;

let enemigos_vivos = 0;

let obstaculos = [];
let enemigos = [];
let enemigos_grandes = [];

let dominio_de_la_pelota = "nadie";
let contador_dominio_pelota = 0;

let jugador = null;
let enemigo = null;
let pelota = null;

let keyUp = false;
let keyDown = false;
let keyLeft = false;
let keyRight = false;

let velocidad = 200;

let velocidad_caminando = 200;
let velocidad_sprintando = 600;

let modoPelota = false;

let sprint = false;

let stamina = 100;

let tweenPelota;

window.onload = function () {
    config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        soundOn: true,
        backgroundColor: '#475231',
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'template',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        },
        audio: {
            disableWebAudio: true
        },
        pixelArt: true,
        scene: [Preloads, Nivel_1, Nivel_2, Nivel_3, Interfaz]
    };

    game = new Phaser.Game(config);
};
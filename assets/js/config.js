const EVENT_ABRIR_PUERTAS = new Event('abrir_puertas');

let progreso_del_juego = {
    nivel_1: 0,
    nivel_2: 0,
    nivel_3: 0,
    nivel_4: 0,
    nivel_5: 0,
    nivel_6: 0,
    nivel_7: 0,
    nivel_8: 0,
    nivel_9: 0,
    nivel_10: 0,
    nivel_11: 0,
    nivel_12: 0,
    nivel_13: 0,
    nivel_14: 0,
    nivel_15: 0
};

let copas = {
    copa_1: false,
    copa_2: false,
    copa_3: false
}

let fuera_linea_offsets = {
    derecha: {x: 0, y: 0},
    izquierda: {x: 0, y: 0},
};

let sceneGlobal;

let enemigos_vivos = 0;

let obstaculos = [];
let enemigos = [];
let enemigos_grandes = [];

let dominio_de_la_pelota = "nadie";
let contador_dominio_pelota = 0;

let jugador = null;
let posicion_inicio = {x: 960, y: 1080};
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
        scene: [Preloads, Tunel, Nivel_1, Nivel_2, Nivel_3, Nivel_4, Nivel_5, Nivel_6, Nivel_7, Nivel_8, Nivel_9, Nivel_10, Nivel_11, Nivel_12, Nivel_13, Nivel_14, Nivel_15, Interfaz]
    };

    game = new Phaser.Game(config);
};
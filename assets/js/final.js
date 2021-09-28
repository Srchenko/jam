class Final extends Phaser.Scene {
    constructor() {
        super("final");
    }

    create(){
        // texto que dice que ganaste centrado
        Interfaz.mostrar_menu_ganaste();

        menu_victoria.fondo.anims.play("ui_menu_victoria");

        this.tweens.add({
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

    update(time, delta){
    }
}
class Final extends Phaser.Scene {
    constructor() {
        super("final");
    }

    create(){
        // texto que dice que ganaste centrado
        this.add.text(config.width/2, config.height/2, "Ganaste", {
            fontSize: '50px',
            fill: '#fff'
        }).setOrigin(0.5);
    }

    update(time, delta){
    }
}
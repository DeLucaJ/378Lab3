/// <reference path='../typings/phaser.d.ts'/>

class GameApp
{
    game: Phaser.Game;
    config: GameConfig = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 1400,
        height: 700,
        scene: [ MainScene ],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: true
            }
        },
        backgroundColor: '#aaddff',
        render : {
            pixelArt: true
        },
    }

    constructor () {
        this.game = new Phaser.Game(this.config);
    }
}

window.onload = () => {
    var game = new GameApp();
}
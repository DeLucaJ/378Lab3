const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#CCCCCC',
    render: {
        pixelArt: true
    },
    scene: {
        preload: preload,
        create: create
    }
}

function preload() {
    
}

function create() {
    
}

var game = new Phaser.Game(config);
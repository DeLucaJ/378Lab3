class MountainScene extends Phaser.Scene
{
    controls : Phaser.Cameras.Controls.FixedKeyControl;
    player;

    constructor() {
        super("MountainScene");
    }

    preload () {
        this.load.image(
            "ice",
            "assets/tilesets/ice_sheet.png"
        );
        this.load.image(
            "tiles",
            "assets/tilesets/tiles_spritesheet.png"
        );
        this.load.tilemapTiledJSON(
            "map",
            "assets/tilemaps/level-1.json"
        );

        this.load.image("player", "assets/tilesets/adventurer_stand.png");
    }

    create () {

    }

    update () {
        this.player.update();
    }
}
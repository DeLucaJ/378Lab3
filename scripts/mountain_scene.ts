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
        //make tilemaps
        const map = this.make.tilemap({key: "map"});

        //add tilesets
        const tiles = map.addTilesetImage("tiles_spritesheet", "tiles");
        const ice = map.addTilesetImage("ice_sheet", "ice");

        //create layers
        const platformLayer = map.createStaticLayer("platforms", tiles, 0, 0);
        const background = map.createStaticLayer("background", tiles, 0, 0);
        const climbable = map.createStaticLayer("climable", ice, 0, 0);

        //spawnpoints
        const playerSpawn = map.findObject("spawns", obj => obj.name === "player-spawn");
        //will probably through warnings
        this.player = new Player(this, 700, 500);

        //worldLayer.setCollisionByProperty({collides: true});
        
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        //this.physics.add.collider(this.player.sprite, worldLayer);

        /*worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/
    
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    update () {
        this.player.update();
    }
}
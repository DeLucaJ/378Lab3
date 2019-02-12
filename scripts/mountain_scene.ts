class MountainScene extends Phaser.Scene
{
    controls : Phaser.Cameras.Controls.FixedKeyControl;
    player : Player;

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
        this.load.image("zork", "assets/tilesets/zork.png");
        this.load.image("player", "assets/tilesets/adventurer_stand.png");
    }

    create () {
        //make tilemaps
        const map = this.make.tilemap({key: "map"});

        //add tilesets
        const tiles = map.addTilesetImage("tiles_spritesheet", "tiles");
        const ice = map.addTilesetImage("ice_sheet", "ice");

        //create layers
        const background = map.createStaticLayer("background", tiles, 0, 0);
        const platforms = map.createStaticLayer("platforms", tiles, 0, 0);
        const climbable = map.createDynamicLayer("climbable", ice, 0, 0);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        //spawnpoints
        this.player = new Player(this, 50, 90 * 70);
        const zork = this.physics.add.sprite(350, 300, "zork");
        zork.displayHeight = 70; zork.displayWidth = 70;
        zork.setCollideWorldBounds(true);

        platforms.setCollisionByProperty({collides: true});
        map.forEachTile(
            function (tile){ 
                tile.collideDown = false;
                tile.collideLeft = false;
                tile.collideRight = false; 
            },
            this.game, 0, 0, map.width, map.height, {isNotEmpty: true}, platforms
        );

        //climbing

        this.physics.add.collider(platforms, this.player.sprite);
        this.physics.add.collider(this.player.sprite, zork);
        this.physics.add.collider(platforms, zork);
        //this.physics.add.overlap(this.player.sprite, climbable); 

        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        
    }

    update () {
        this.player.update();
    }
}
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

        this.load.spritesheet('sheet', 'assets/tilesets/adventurer_tilesheet.png', { frameWidth: 80, frameHeight: 110});
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

        this.anims.create({
            key: 'sheet-all',
            frames: this.anims.generateFrameNames('sheet'),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-idle',
            frames: this.anims.generateFrameNames('sheet', {start: 0, end: 0}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-walk',
            frames: this.anims.generateFrameNames('sheet', {start: 9, end: 10}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-jump',
            frames: this.anims.generateFrameNames('sheet', {start: 1, end: 1}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-damaged',
            frames: this.anims.generateFrameNames('sheet', {start: 4, end: 4}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-fall',
            frames: this.anims.generateFrameNames('sheet', {start: 2, end: 2}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-cheer',
            frames: this.anims.generateFrameNames('sheet', {start: 7, end: 8}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });

        this.anims.create({
            key: 'sheet-talk',
            frames: this.anims.generateFrameNames('sheet', {start: 18, end: 18}),
            frameRate: 6,
            yoyo: false,
            repeat: -1 });
    }

    update () {
        this.player.update();
    }
}
class MainScene extends Phaser.Scene  
{
    //world : Phaser.Physics.Arcade.World;

    controls : Phaser.Cameras.Controls.FixedKeyControl;
    player;

    constructor () {
        super("MainScene");
    }

    preload () {
        this.load.image(
            "buildings",
            "assets/tilesets/building_spritesheet.png"
        );
        this.load.image(
            "tiles",
            "assets/tilesets/tiles_spritesheet.png"
        );
        this.load.tilemapTiledJSON(
            "map",
            "assets/tilemaps/basic-map.json"
        );

        this.load.image("player", "assets/tilesets/adventurer_stand.png");

        this.load.spritesheet('sheet', 'assets/tilesets/adventurer_tilesheet.png', { frameWidth: 80, frameHeight: 110})
    }

    create () {
        //make tilemaps
        const map = this.make.tilemap({key: "map"});

        //add tilesets
        const tiles = map.addTilesetImage("tiles_spritesheet", "tiles");
        const buildings = map.addTilesetImage("building_spritesheet", "buildings");

        //create layers
        const worldLayer = map.createStaticLayer("world", tiles, 0, 0);
        const backLayerM = map.createStaticLayer("background-mid", buildings, 0, 0);
        const backLayerF = map.createStaticLayer("background-front", buildings, 0, 0);

        //spawnpoints
        const playerSpawn = map.findObject("spawns", obj => obj.name === "player-spawn");
        //will probably through warnings
        this.player = new Player(this, 700, 500);

        worldLayer.setCollisionByProperty({collides: true});
        
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.physics.add.collider(this.player.sprite, worldLayer);

        /*worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/
    
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

    update (time, delta) {
        this.player.update();
    }
}
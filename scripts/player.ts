class Player
{
    scene : Phaser.Scene;
    sprite : Phaser.Physics.Arcade.Sprite;
    keys;

    constructor(scene, x, y)
    {
        this.scene = scene;

        //may pass as an argument later
        this.sprite = scene.physics.add.sprite(x, y, "player");
        this.sprite.setDrag(1000, 0);
        this.sprite.setMaxVelocity(300, 400);
        this.sprite.setSize(80, 112);
        //this.sprite.setOffset(7, 9);

        const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D
        });

        this.sprite.setCollideWorldBounds(true);
    }

    update () {
        const onGround = this.sprite.body.blocked.down;
        const acceleration = onGround ? 600 : 200;

        if (this.keys.left.isDown || this.keys.a.isDown) {
            this.sprite.setAccelerationX(-acceleration);
            this.sprite.setFlipX(true);
        } 
        else if (this.keys.right.isDown || this.keys.d.isDown) {
            this.sprite.setAccelerationX(acceleration);
            this.sprite.setFlipX(false);
        }
        else {
            this.sprite.setAccelerationX(0);
        }

        //only allowed if they are on ground
        if (onGround && (this.keys.up.isDown || this.keys.w.isDown)){
            //velocity instead of acceleration b/c there is global gravity
            this.sprite.setVelocityY(-500);
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}
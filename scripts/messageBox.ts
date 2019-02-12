class messageBox {
    scene : Phaser.Scene;
    sprite : Phaser.Physics.Arcade.Sprite;
    game;
    messageBox;
    messageText : "default text"

    preload() {
        this.game.image("closeButton", "assets/tilesets/buttonSquare_grey_pressed.png");
        this.game.image("boxBack", "assets/tilesets/panel_blue.png");
    }

    constructor(scene) {
        this.scene = scene;
        this.game = scene.game
    }

    createMessageBox(text, width, height) {
        if (this.messageBox)
            this.destroy();

        var msgBox = this.game.add.group();
        var back = this.game.add.sprite(0,0,"boxBack");
        var closeButton = this.game.add.sprite(0,0,"closeButton");
        var text1 = this.game.add.text(0,0,text)
        text1.wordWrap = true;
        text1.wordWrapWidth = width * .9;

        back.width = width;
        back.heith = height;

        msgBox.add(back);
        msgBox.add(closeButton);
        msgBox.add(text1)

        closeButton.x = back.width / 2 - closeButton.width / 2;
        closeButton.y = back.height - closeButton.height;
        //enable the button for input
        closeButton.inputEnabled = true;
        //add a listener to destroy the box when the button is pressed
        closeButton.events.onInputDown.add(this.destroy, this);
        //
        //
        //set the message box in the center of the screen
        msgBox.x = this.game.width / 2 - msgBox.width / 2;
        msgBox.y = this.game.height / 2 - msgBox.height / 2;
        //
        //set the text in the middle of the message box
        text1.x = back.width / 2 - text1.width / 2;
        text1.y = back.height / 2 - text1.height / 2;

        this.messageBox = msgBox;




        //draw background
        //draw button
        //draw text
        //rules from removal
    }

    update() { }

    destroy() { this.sprite.destroy(); }    
}
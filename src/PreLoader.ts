module CodeBarWar {

    export class Preloader extends Phaser.State {


        preload() {
            this.game.load.atlas('mainmenu_button', 'assets/buttons/mainmenu_button.png', 'assets/buttons/mainmenu_button.json');
            this.load.image('mainmenu_background', 'assets/menus/coquelicot.jpg');
            this.game.load.spritesheet('hero', 'assets/characters/fille.png', 64, 64);
        }

        create() {
            let gameWidth:number = 1600;
            let gameHeight:number = 640;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.maxWidth = gameWidth;
                this.game.scale.maxHeight = gameHeight;
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            }
            else {
                //  Same goes for mobile settings.
            }

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('MainMenu', true, false);
        }

    }

}

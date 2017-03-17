module CodeBarWar {

    export class Preloader extends Phaser.State {


        preload() {
            this.game.load.atlas('mainmenu_button', 'assets/buttons/mainmenu_button.png', 'assets/buttons/mainmenu_button.json');
            this.load.image('mainmenu_background', 'assets/menus/coquelicot.jpg');
            this.game.load.spritesheet('hero', 'assets/characters/fille.png', 64, 64);
        }

        create() {

            this.game.state.start('MainMenu', true, false);
        }

    }

}

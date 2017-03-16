module CodeBarWar {

    export class MainMenu extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
            
            
        }

        create() {
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;
            var itsisTextStyle = {
              font: "bold 72px Arial",
              fill: "#f00",
              align: "center"
            }
            var CodeBarWarText = this.game.add.text(this.game.world.centerX, this.game.height/10, "CODE BAR WARS", itsisTextStyle);
            CodeBarWarText.anchor.set(0.5);

            var buttonTextStyle = {
              font:"32px Arial",
              fill: "#f00"
            }

            var playButton = this.game.add.button(this.game.world.centerX, 3*this.game.height/10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            playButton.anchor.set(0.5);
            var playButtonText = this.game.add.text(this.game.world.centerX, 3*this.game.height/10, "Jouer", buttonTextStyle);
            playButtonText.anchor.set(0.5);
            
        }

        startPlay(){
            this.game.state.start("LoaderDonjon",true,false);
        }


    }

}

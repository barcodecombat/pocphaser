module CodeBarWar {

    export class LoaderDonjon extends Phaser.State {

        preload() {
            this.game.load.json('characters', 'assets/characters/characters.json');
        }

        create() {
            this.game.state.start('Donjon',true,false);
        }

            



    }

}

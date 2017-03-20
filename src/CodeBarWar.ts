module CodeBarWar {

    export class CodeBarWarMain extends Phaser.Game {

        constructor() {

            super(1600, 640, Phaser.AUTO, 'content', null);

            // Main Menu
            // this.state.add('Boot', Boot, true);
            this.state.add('Preloader', Preloader, false);
            this.state.add('LoaderDonjon', LoaderDonjon, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Donjon', Donjon, false);
            // this.state.add('ChooseMission', ChooseMission, false);
            // this.state.add("Credits", Credits, false);
            // this.state.add("EndMission", EndMission, false);
            //
            // // Actual game
            // this.state.add("Loaderjeu", Loaderjeu, false);
            // this.state.add("Jeu", Jeu, false);
            this.state.start('Preloader', true, false);
        }

    }

}


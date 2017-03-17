module CodeBarWar {

    export class Donjon extends Phaser.State {
        charJSON;
        map;
        layer;
        sp;
        hero : Character;

        preload() {
            this.charJSON = this.game.cache.getJSON('characters');    
            this.game.load.tilemap('donjon', 'assets/maps/donjon1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'assets/maps/tileset1.png');
            this.game.load.atlasJSONHash('fille', 'assets/characters/fille.png', 'assets/characters/animateFille.json');
        }

        create() {
            this.game.stage.backgroundColor = '#787878';
            this.map = this.game.add.tilemap('donjon');
            this.map.addTilesetImage('Donjon1-1', 'tiles');
            this.layer = this.map.createLayer('Donjon1');
            this.layer.resizeWorld();
            this.layer.wrap = true;
            this.hero = new Character(<CodeBarWarMain>this.game);
            
        }

        update(){
            this.hero.update();
        }

            



    }

}

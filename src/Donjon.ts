module CodeBarWar {

    export class Donjon extends Phaser.State {
        charJSON;
        map;
        layer;
        sp;
        hero : Character;
        monsters : Character[] = [];

        preload() {
            this.charJSON = this.game.cache.getJSON('characters');    
            this.game.load.tilemap('donjon', 'assets/maps/donjon1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'assets/maps/tileset1.png');
            this.game.load.atlasJSONHash('fille', 'assets/characters/fille.png', 'assets/characters/animateFille.json');
            this.game.load.atlasJSONHash('rose', 'assets/characters/rose.png', 'assets/characters/animateRose.json');
        }

        create() {
            this.game.stage.backgroundColor = '#787878';
            this.map = this.game.add.tilemap('donjon');
            this.map.addTilesetImage('Donjon1-1', 'tiles');
            this.layer = this.map.createLayer('Donjon1');
            this.layer.resizeWorld();
            this.layer.wrap = true;
            this.hero = new Character(<CodeBarWarMain>this.game,"fille",200,200);
            this.monsters.push(new Character(<CodeBarWarMain>this.game,"rose",500,300));
            
        }

        update(){
            this.hero.update();
            this.monsters.forEach(function(monster){
                monster.update();
            });
        }

    }

}

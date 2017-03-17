module CodeBarWar {

    export class Donjon extends Phaser.State {
        charJSON;
        map;
        layer;

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
            var sp = this.game.add.sprite(200,200,"fille");
            sp.scale.setTo(0.5,0.5);
            sp.animations.add("walkdown",[0,1,2]);
            sp.animations.add("walkleft",[3,4,5]);
            sp.animations.add("walkright",[6,7,8]);
            sp.animations.add("walkup",[9,10,11]);
            sp.animations.play('walkup', 9, true);
            
        }

        update(){
            
        }

            



    }

}

module CodeBarWar {

    export class Donjon extends Phaser.State {
        charJSON;
        map;
        layer;
        sp;
        bmd;

        innerCircle;
        outerCircle
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
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#787878';
            this.map = this.game.add.tilemap('donjon');
            this.map.addTilesetImage('Donjon1-1', 'tiles');
            this.map.setCollisionBetween(1, 100);
            
            this.layer = this.map.createLayer('Donjon1');
            this.layer.resizeWorld();
            this.layer.wrap = true;
            this.bmd = this.game.make.bitmapData(1280, 1024);
            this.bmd.addToWorld();
            //this.game.add.sprite(0,0,this.bmd);
            this.hero = new Character(<CodeBarWarMain>this.game,"fille",320,96,true);
            this.monsters.push(new Character(<CodeBarWarMain>this.game,"rose",544,320,false));

            this.innerCircle = new Phaser.Circle(200, 200, 100);


        }

        update(){
            Character.update(this.layer);
            DegatText.update();
            this.bmd.alphaMask(this.hero.sprite,this.layer);
        }

    }

}

module CodeBarWar {

    export class Character{
        static listOfCharacters : Character[] = [];

        Name : String;
        sprite : Phaser.Sprite;
        game : CodeBarWarMain;
        isHero : boolean;

        constructor(game:CodeBarWarMain, source:string,posX:number,posY:number,hero:boolean){
            this.game = game;
            this.sprite = game.add.sprite(posX,posY,source);
            this.sprite.scale.setTo(0.5,0.5);
            this.sprite.animations.add("walkdown",[0,1,2]);
            this.sprite.animations.add("walkleft",[3,4,5]);
            this.sprite.animations.add("walkright",[6,7,8]);
            this.sprite.animations.add("walkup",[9,10,11]);
            this.isHero = hero;
            Character.listOfCharacters.push(this);
        
        }

        updatePos(x,y){
            
            if (x!=0){
                this.sprite.x += x;
                if (x>0){
                    this.sprite.animations.play('walkright', 9, true);    
                }else{
                    this.sprite.animations.play('walkleft', 9, true);    
                }
            }else if(y!=0){
                this.sprite.y += y;
                if (y<0){
                    this.sprite.animations.play('walkup', 9, true);
                }else{
                    this.sprite.animations.play('walkdown', 9, true);
                }
            }else{
                this.sprite.animations.stop(null,true);
            }
        }

        moveHero(){
            var x : number =0;
            var y : number =0;
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q))
            {
                x -= 2;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
            {
                x += 2;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z))
            {
                y -= 2;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                y += 2;
            }

            this.updatePos(x,y);
            
        }

        update(){
            if(this.isHero == true){
                this.moveHero();
            }
        }

        static update(){
            Character.listOfCharacters.forEach(function(ch){
                ch.update();
            });
        }
        
    }


}
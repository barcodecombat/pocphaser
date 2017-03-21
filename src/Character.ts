module CodeBarWar {

    export class Character{
        static listOfCharacters : Character[] = [];

        Name : String = "";
        sprite : Phaser.Sprite = null;
        game : CodeBarWarMain = null;
        isHero : boolean = false;
        hitPoints : number = 100;

        constructor(game:CodeBarWarMain, source:string,posX:number,posY:number,hero:boolean){
            this.game = game;
            this.sprite = game.add.sprite(posX,posY,source);
            this.sprite.scale.setTo(0.5,0.5);
            this.sprite.animations.add("walkdown",[0,1,2]);
            this.sprite.animations.add("walkleft",[3,4,5]);
            this.sprite.animations.add("walkright",[6,7,8]);
            this.sprite.animations.add("walkup",[9,10,11]);
            this.isHero = hero;
            this.game.physics.enable(this.sprite);
            this.sprite.body.setSize(32, 32, 8, 8);
            
            Character.listOfCharacters.push(this);
        }

        updatePos(x,y){
            if (x!=0){
                this.sprite.body.velocity.x = x*50;
                if (x>0){
                    this.sprite.animations.play('walkright', 9, true);    
                }else{
                    this.sprite.animations.play('walkleft', 9, true);    
                }
            }else{
                this.sprite.body.velocity.x = 0;
            }
            if(y!=0){
                this.sprite.body.velocity.y = y*50;
                if (y<0){
                    this.sprite.animations.play('walkup', 9, true);
                }else{
                    this.sprite.animations.play('walkdown', 9, true);
                }
            }else{
                this.sprite.body.velocity.y = 0;
            }
            if (x==0 && y==0) this.sprite.animations.stop(null,true);
        }

        moveHero(){
            var x : number =0;
            var y : number =0;
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) x -= 2;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) x += 2;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) y -= 2;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))y += 2;
            
            this.updatePos(x,y);
        }

        calcDistance(ch1 : Character, ch2 : Character){
            var distance : number;
            var xSq : number;
            var ySq : number;
            var distance : number;
            xSq = ch1.sprite.x - ch2.sprite.x;
            ySq = ch1.sprite.y - ch2.sprite.y;
            distance = Math.sqrt(xSq*xSq + ySq*ySq);
            return distance;
        }


        actionHero(){
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
                var _this : Character = this;
                Character.listOfCharacters.forEach(function(ch){
                    if (ch.isHero == false) {
                        var distance : number;
                        distance = _this.calcDistance(_this,ch);
                        
                    }
                });
            }
        }

        update(layer){
            this.game.physics.arcade.collide(this.sprite, layer);
            if(this.isHero == true){
                console.log(this.sprite.x);
                this.moveHero();
                this.actionHero();
            }else{
                console.log("hp = " + this.hitPoints);
            }
        }

        static update(layer){
            Character.listOfCharacters.forEach(function(ch){
                ch.update(layer);
            });
        }
        
    }


}
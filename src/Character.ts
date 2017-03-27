module CodeBarWar {

    export class Character{
        static listOfCharacters : Character[] = [];
        static sequence : number = 0;

        id : number = 0;
        Name : String = "";
        sprite : Phaser.Sprite = null;
        game : CodeBarWarMain = null;
        isHero : boolean = false;
        hitPoints : number = 100;
        direction : number ; //0 up, 1 down, 2 right, 3 left
        lastActionTicks : number = 0;
        speed : number = 5;
        item : Weapon = null;

        constructor(game:CodeBarWarMain, source:string,posX:number,posY:number,hero:boolean){
            Character.sequence += 1;
            this.id = Character.sequence;
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
            if (this.isHero){
                this.item = new Weapon();
            }
        }

        updatePos(x,y){
            if (x!=0){
                this.sprite.body.velocity.x = x*50;
                if (x>0){
                    this.sprite.animations.play('walkright', 9, true);    
                    this.direction=2;
                }else{
                    this.sprite.animations.play('walkleft', 9, true);    
                    this.direction=3;
                }
            }else{
                this.sprite.body.velocity.x = 0;
            }
            if(y!=0){
                this.sprite.body.velocity.y = y*50;
                if (y<0){
                    this.sprite.animations.play('walkup', 9, true);
                    this.direction=0;
                }else{
                    this.sprite.animations.play('walkdown', 9, true);
                    this.direction=1;
                }
            }else{
                this.sprite.body.velocity.y = 0;
            }
            if (x==0 && y==0) this.sprite.animations.stop(null,true);
        }

        moveHero(){
            var x : number =0;
            var y : number =0;
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) x -= this.speed;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) x += this.speed;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) y -= this.speed;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))y += this.speed;
            
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

        fight(){
            var diff : number = this.game.time.time - this.lastActionTicks;
            if (diff >100){
                this.lastActionTicks = this.game.time.time;
                var _this : Character = this;
                var range :number = 10;
                var rotateRange :number = 10;
                if (_this.item != null){
                    range = _this.item.range;
                    rotateRange = _this.item.rotateRange;
                }
                var nbHit : number =0;
                var monsterKilled : Character[] = [];
                Character.listOfCharacters.forEach(function(ch){
                    if (nbHit < _this.item.nbAttack){
                        if (ch.isHero != _this.isHero) {
                            var isNear : boolean=false;
                            
                            if((_this.direction==1)&&(ch.sprite.y>_this.sprite.y)){
                                var diffY :number = ch.sprite.y-_this.sprite.y;
                                var diffX :number = Math.abs(ch.sprite.x-_this.sprite.x);
                                var max : number = diffY * Math.cos(rotateRange);
                                if ((diffY<range) && (diffX<max))
                                    isNear = true;
                            }
                            if((_this.direction==0)&&(ch.sprite.y<_this.sprite.y)){
                                var diffY :number = _this.sprite.y-ch.sprite.y;
                                var diffX :number = Math.abs(ch.sprite.x-_this.sprite.x);
                                var max : number = diffY * Math.cos(rotateRange);
                                if ((diffY<range) && (diffX<max))
                                    isNear = true;
                            }
                            if((_this.direction==3)&&(ch.sprite.x<_this.sprite.x)&&((_this.sprite.x-ch.sprite.x)<50)){
                                var diffX :number = _this.sprite.x-ch.sprite.x;
                                var diffY :number = Math.abs(ch.sprite.y-_this.sprite.y);
                                var max : number = diffX * Math.cos(rotateRange);
                                if ((diffX<range) && (diffY<max))
                                    isNear = true;
                            }
                            if((_this.direction==2)&&(ch.sprite.x>_this.sprite.x)&&((ch.sprite.x-_this.sprite.x)<50)){
                                var diffX :number = ch.sprite.x-_this.sprite.x;
                                var diffY :number = Math.abs(ch.sprite.y-_this.sprite.y);
                                var max : number = diffX * Math.cos(rotateRange);
                                if ((diffX<range) && (diffY<max))
                                    isNear = true;
                            }
                            if (isNear == true){
                                if (_this.item!=null){
                                    let degat : number = Math.floor(Math.random() * _this.item.maxDegat) + _this.item.minDegat;
                                    ch.hitPoints -= degat;
                                    nbHit += 1;
                                    console.log("hit" + ch.hitPoints);
                                    new DegatText(<CodeBarWarMain>_this.game,""+degat,ch.sprite.x+10,ch.sprite.y-10,_this.game.time.time,"#00ff00");
                                    if (ch.hitPoints<=0){
                                        monsterKilled.push(ch);                        
                                    }
                                }
                            }
                        }
                    }
                });
                if (monsterKilled.length>0)
                    this.kill(monsterKilled);
            }
        }

        kill(toKill : Character[]){
            let newList : Character[] =[];
            Character.listOfCharacters.forEach(function(ch){
                let found : Character = ch;
                for(let i:number =0;i<toKill.length;i++){
                    if(toKill[i] == ch){
                        found = null;
                        break;
                    }
                }
                if (found != null){
                    newList.push(found);
                }
            });
            Character.listOfCharacters = newList;
            toKill.forEach(function(ch){
                ch.sprite.destroy();
            });
        }


        action(){
            if (this.isHero == true){
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
                    this.fight();
                }
            }else{

            }
        }

        update(layer){
            this.game.physics.arcade.collide(this.sprite, layer);
            if(this.isHero == true){
                this.moveHero();
                
            }
            this.action();
        }

        static update(layer){
            Character.listOfCharacters.forEach(function(ch){
                ch.update(layer);
            });
        }
        
    }


}
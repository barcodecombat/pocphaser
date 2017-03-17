module CodeBarWar {

    export class Character{
        Name : String;
        sprite : Phaser.Sprite;
        game : CodeBarWarMain;

        constructor(game:CodeBarWarMain){
            this.game = game;
            this.sprite = game.add.sprite(200,200,"fille");
            this.sprite.scale.setTo(0.5,0.5);
            this.sprite.animations.add("walkdown",[0,1,2]);
            this.sprite.animations.add("walkleft",[3,4,5]);
            this.sprite.animations.add("walkright",[6,7,8]);
            this.sprite.animations.add("walkup",[9,10,11]);
        }

        update(){
            
            var movementOn:boolean = false;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                this.sprite.x -= 2;
                this.sprite.animations.play('walkleft', 9, true);
                movementOn = true;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.sprite.x += 2;
                this.sprite.animations.play('walkright', 9, true);
                movementOn = true;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                this.sprite.y -= 2;
                this.sprite.animations.play('walkup', 9, true);
                movementOn = true;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                this.sprite.y += 2;
                this.sprite.animations.play('walkdown', 9, true);
                movementOn = true;
            }

            if (movementOn == false){
                this.sprite.animations.stop(null,true);

            }
        }
        
    }
}
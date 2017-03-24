module CodeBarWar {

    export class DegatText{
        static listOfText : DegatText[] = [];

        Name : String = "";
        text : Phaser.Text = null;
        game : CodeBarWarMain = null;
        timer : number = 0;

        constructor(game:CodeBarWarMain, text:string,posX:number,posY:number,timer : number,color :string){
            this.game = game;
            this.text = game.add.text(posX, posY, text, { font: "20px Arial", fill: color, align: "center" });;
            this.timer = timer;
            DegatText.listOfText.push(this);
        }

        

        update(){
            if ((this.game.time.time - this.timer )> 500){
                this.text.destroy();
                return true;
            }else{
                this.text.y -= 5;
            }
            return false;
        }

        static update(){
            var listToDelete = [];
            DegatText.listOfText.forEach(function(dt){
                if (dt.update()){
                    listToDelete.push(dt);
                }
            });
            
            if(listToDelete.length>0){
                var newList : DegatText[] = [];
                DegatText.listOfText.forEach(function(dt){
                    var found :boolean = false;
                    for(var i:number = 0; i < listToDelete.length ; i ++){
                        if(listToDelete[i] == dt){
                            found = true;
                            break;
                        }
                    }
                    if (found == false){
                        newList.push(dt);
                    }
                });
                DegatText.listOfText=newList;
            }
        }
        
    }


}
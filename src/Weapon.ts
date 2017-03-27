module CodeBarWar {

    export class Weapon extends Item{
        range : number;
        rotateRange : number;
        minDegat : number;
        maxDegat : number;
        nbAttack : number;

        constructor(){
            super();
            this.range = 50;
            this.rotateRange = 45;
            this.minDegat = 1;
            this.maxDegat = 6;
            this.nbAttack = 1;
        }
    }
}
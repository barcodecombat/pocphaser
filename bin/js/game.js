var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var game = new CodeBarWar.CodeBarWarMain();
};
var CodeBarWar;
(function (CodeBarWar) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.game.load.atlas('mainmenu_button', 'assets/buttons/mainmenu_button.png', 'assets/buttons/mainmenu_button.json');
            this.load.image('mainmenu_background', 'assets/menus/coquelicot.jpg');
            this.game.load.spritesheet('hero', 'assets/characters/fille.png', 64, 64);
        };
        Preloader.prototype.create = function () {
            var gameWidth = 1600;
            var gameHeight = 640;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.maxWidth = gameWidth;
                this.game.scale.maxHeight = gameHeight;
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    CodeBarWar.Preloader = Preloader;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.preload = function () {
        };
        MainMenu.prototype.create = function () {
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;
            var itsisTextStyle = {
                font: "bold 72px Arial",
                fill: "#f00",
                align: "center"
            };
            var CodeBarWarText = this.game.add.text(this.game.world.centerX, this.game.height / 10, "CODE BAR WARS", itsisTextStyle);
            CodeBarWarText.anchor.set(0.5);
            var buttonTextStyle = {
                font: "32px Arial",
                fill: "#f00"
            };
            var playButton = this.game.add.button(this.game.world.centerX, 3 * this.game.height / 10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            playButton.anchor.set(0.5);
            var playButtonText = this.game.add.text(this.game.world.centerX, 3 * this.game.height / 10, "Jouer", buttonTextStyle);
            playButtonText.anchor.set(0.5);
        };
        MainMenu.prototype.startPlay = function () {
            this.game.state.start("LoaderDonjon", true, false);
        };
        return MainMenu;
    }(Phaser.State));
    CodeBarWar.MainMenu = MainMenu;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var Donjon = (function (_super) {
        __extends(Donjon, _super);
        function Donjon() {
            var _this = _super.apply(this, arguments) || this;
            _this.monsters = [];
            return _this;
        }
        Donjon.prototype.preload = function () {
            this.charJSON = this.game.cache.getJSON('characters');
            this.game.load.tilemap('donjon', 'assets/maps/donjon1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'assets/maps/tileset1.png');
            this.game.load.atlasJSONHash('fille', 'assets/characters/fille.png', 'assets/characters/animateFille.json');
            this.game.load.atlasJSONHash('rose', 'assets/characters/rose.png', 'assets/characters/animateRose.json');
        };
        Donjon.prototype.create = function () {
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
            this.hero = new CodeBarWar.Character(this.game, "fille", 320, 96, true);
            this.monsters.push(new CodeBarWar.Character(this.game, "rose", 544, 320, false));
            this.innerCircle = new Phaser.Circle(200, 200, 100);
        };
        Donjon.prototype.update = function () {
            CodeBarWar.Character.update(this.layer);
            CodeBarWar.DegatText.update();
            this.bmd.alphaMask(this.hero.sprite, this.layer);
        };
        return Donjon;
    }(Phaser.State));
    CodeBarWar.Donjon = Donjon;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var LoaderDonjon = (function (_super) {
        __extends(LoaderDonjon, _super);
        function LoaderDonjon() {
            return _super.apply(this, arguments) || this;
        }
        LoaderDonjon.prototype.preload = function () {
            this.game.load.json('characters', 'assets/characters/characters.json');
            this.game.load.json('animateFille', 'assets/characters/animateFille.json');
        };
        LoaderDonjon.prototype.create = function () {
            this.game.state.start('Donjon', true, false);
        };
        return LoaderDonjon;
    }(Phaser.State));
    CodeBarWar.LoaderDonjon = LoaderDonjon;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var DegatText = (function () {
        function DegatText(game, text, posX, posY, timer, color) {
            this.Name = "";
            this.text = null;
            this.game = null;
            this.timer = 0;
            this.game = game;
            this.text = game.add.text(posX, posY, text, { font: "20px Arial", fill: color, align: "center" });
            ;
            this.timer = timer;
            DegatText.listOfText.push(this);
        }
        DegatText.prototype.update = function () {
            if ((this.game.time.time - this.timer) > 500) {
                this.text.destroy();
                return true;
            }
            else {
                this.text.y -= 5;
            }
            return false;
        };
        DegatText.update = function () {
            var listToDelete = [];
            DegatText.listOfText.forEach(function (dt) {
                if (dt.update()) {
                    listToDelete.push(dt);
                }
            });
            if (listToDelete.length > 0) {
                var newList = [];
                DegatText.listOfText.forEach(function (dt) {
                    var found = false;
                    for (var i = 0; i < listToDelete.length; i++) {
                        if (listToDelete[i] == dt) {
                            found = true;
                            break;
                        }
                    }
                    if (found == false) {
                        newList.push(dt);
                    }
                });
                DegatText.listOfText = newList;
            }
        };
        return DegatText;
    }());
    DegatText.listOfText = [];
    CodeBarWar.DegatText = DegatText;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var Item = (function () {
        function Item() {
        }
        return Item;
    }());
    CodeBarWar.Item = Item;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon() {
            var _this = _super.call(this) || this;
            _this.range = 50;
            _this.rotateRange = 45;
            _this.minDegat = 1;
            _this.maxDegat = 6;
            _this.nbAttack = 1;
            return _this;
        }
        return Weapon;
    }(CodeBarWar.Item));
    CodeBarWar.Weapon = Weapon;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var CodeBarWarMain = (function (_super) {
        __extends(CodeBarWarMain, _super);
        function CodeBarWarMain() {
            var _this = _super.call(this, 1600, 640, Phaser.AUTO, 'content', null) || this;
            // Main Menu
            // this.state.add('Boot', Boot, true);
            _this.state.add('Preloader', CodeBarWar.Preloader, false);
            _this.state.add('LoaderDonjon', CodeBarWar.LoaderDonjon, false);
            _this.state.add('MainMenu', CodeBarWar.MainMenu, false);
            _this.state.add('Donjon', CodeBarWar.Donjon, false);
            // this.state.add('ChooseMission', ChooseMission, false);
            // this.state.add("Credits", Credits, false);
            // this.state.add("EndMission", EndMission, false);
            //
            // // Actual game
            // this.state.add("Loaderjeu", Loaderjeu, false);
            // this.state.add("Jeu", Jeu, false);
            _this.state.start('Preloader', true, false);
            return _this;
        }
        return CodeBarWarMain;
    }(Phaser.Game));
    CodeBarWar.CodeBarWarMain = CodeBarWarMain;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var Character = (function () {
        function Character(game, source, posX, posY, hero) {
            this.id = 0;
            this.Name = "";
            this.sprite = null;
            this.game = null;
            this.isHero = false;
            this.hitPoints = 100;
            this.lastActionTicks = 0;
            this.speed = 5;
            this.item = null;
            Character.sequence += 1;
            this.id = Character.sequence;
            this.game = game;
            this.sprite = game.add.sprite(posX, posY, source);
            this.sprite.scale.setTo(0.5, 0.5);
            this.sprite.animations.add("walkdown", [0, 1, 2]);
            this.sprite.animations.add("walkleft", [3, 4, 5]);
            this.sprite.animations.add("walkright", [6, 7, 8]);
            this.sprite.animations.add("walkup", [9, 10, 11]);
            this.isHero = hero;
            this.game.physics.enable(this.sprite);
            this.sprite.body.setSize(32, 32, 8, 8);
            Character.listOfCharacters.push(this);
            if (this.isHero) {
                this.item = new CodeBarWar.Weapon();
            }
        }
        Character.prototype.updatePos = function (x, y) {
            if (x != 0) {
                this.sprite.body.velocity.x = x * 50;
                if (x > 0) {
                    this.sprite.animations.play('walkright', 9, true);
                    this.direction = 2;
                }
                else {
                    this.sprite.animations.play('walkleft', 9, true);
                    this.direction = 3;
                }
            }
            else {
                this.sprite.body.velocity.x = 0;
            }
            if (y != 0) {
                this.sprite.body.velocity.y = y * 50;
                if (y < 0) {
                    this.sprite.animations.play('walkup', 9, true);
                    this.direction = 0;
                }
                else {
                    this.sprite.animations.play('walkdown', 9, true);
                    this.direction = 1;
                }
            }
            else {
                this.sprite.body.velocity.y = 0;
            }
            if (x == 0 && y == 0)
                this.sprite.animations.stop(null, true);
        };
        Character.prototype.moveHero = function () {
            var x = 0;
            var y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q))
                x -= this.speed;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
                x += this.speed;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z))
                y -= this.speed;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
                y += this.speed;
            this.updatePos(x, y);
        };
        Character.prototype.calcDistance = function (ch1, ch2) {
            var distance;
            var xSq;
            var ySq;
            var distance;
            xSq = ch1.sprite.x - ch2.sprite.x;
            ySq = ch1.sprite.y - ch2.sprite.y;
            distance = Math.sqrt(xSq * xSq + ySq * ySq);
            return distance;
        };
        Character.prototype.fight = function () {
            var diff = this.game.time.time - this.lastActionTicks;
            if (diff > 100) {
                this.lastActionTicks = this.game.time.time;
                var _this = this;
                var range = 10;
                var rotateRange = 10;
                if (_this.item != null) {
                    range = _this.item.range;
                    rotateRange = _this.item.rotateRange;
                }
                var nbHit = 0;
                var monsterKilled = [];
                Character.listOfCharacters.forEach(function (ch) {
                    if (nbHit < _this.item.nbAttack) {
                        if (ch.isHero != _this.isHero) {
                            var isNear = false;
                            if ((_this.direction == 1) && (ch.sprite.y > _this.sprite.y)) {
                                var diffY = ch.sprite.y - _this.sprite.y;
                                var diffX = Math.abs(ch.sprite.x - _this.sprite.x);
                                var max = diffY * Math.cos(rotateRange);
                                if ((diffY < range) && (diffX < max))
                                    isNear = true;
                            }
                            if ((_this.direction == 0) && (ch.sprite.y < _this.sprite.y)) {
                                var diffY = _this.sprite.y - ch.sprite.y;
                                var diffX = Math.abs(ch.sprite.x - _this.sprite.x);
                                var max = diffY * Math.cos(rotateRange);
                                if ((diffY < range) && (diffX < max))
                                    isNear = true;
                            }
                            if ((_this.direction == 3) && (ch.sprite.x < _this.sprite.x) && ((_this.sprite.x - ch.sprite.x) < 50)) {
                                var diffX = _this.sprite.x - ch.sprite.x;
                                var diffY = Math.abs(ch.sprite.y - _this.sprite.y);
                                var max = diffX * Math.cos(rotateRange);
                                if ((diffX < range) && (diffY < max))
                                    isNear = true;
                            }
                            if ((_this.direction == 2) && (ch.sprite.x > _this.sprite.x) && ((ch.sprite.x - _this.sprite.x) < 50)) {
                                var diffX = ch.sprite.x - _this.sprite.x;
                                var diffY = Math.abs(ch.sprite.y - _this.sprite.y);
                                var max = diffX * Math.cos(rotateRange);
                                if ((diffX < range) && (diffY < max))
                                    isNear = true;
                            }
                            if (isNear == true) {
                                if (_this.item != null) {
                                    var degat = Math.floor(Math.random() * _this.item.maxDegat) + _this.item.minDegat;
                                    ch.hitPoints -= degat;
                                    nbHit += 1;
                                    console.log("hit" + ch.hitPoints);
                                    new CodeBarWar.DegatText(_this.game, "" + degat, ch.sprite.x + 10, ch.sprite.y - 10, _this.game.time.time, "#00ff00");
                                    if (ch.hitPoints <= 0) {
                                        monsterKilled.push(ch);
                                    }
                                }
                            }
                        }
                    }
                });
                if (monsterKilled.length > 0)
                    this.kill(monsterKilled);
            }
        };
        Character.prototype.kill = function (toKill) {
            console.log("kill " + toKill);
            var newList = [];
            Character.listOfCharacters.forEach(function (ch) {
                var found = ch;
                console.log("killtokill " + toKill);
                ;
                for (var i = 0; i < toKill.length; i++) {
                    console.log("%o %o", ch, toKill[i]);
                    if (toKill[i] == ch) {
                        found = null;
                        break;
                    }
                }
                if (found != null) {
                    newList.push(found);
                }
            });
            console.log("newList " + newList.length);
            Character.listOfCharacters = newList;
            toKill.forEach(function (ch) {
                ch.sprite.destroy();
                console.log("destroy");
            });
        };
        Character.prototype.action = function () {
            if (this.isHero == true) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
                    this.fight();
                }
            }
            else {
            }
        };
        Character.prototype.update = function (layer) {
            this.game.physics.arcade.collide(this.sprite, layer);
            if (this.isHero == true) {
                this.moveHero();
            }
            this.action();
        };
        Character.update = function (layer) {
            Character.listOfCharacters.forEach(function (ch) {
                ch.update(layer);
            });
        };
        return Character;
    }());
    Character.listOfCharacters = [];
    Character.sequence = 0;
    CodeBarWar.Character = Character;
})(CodeBarWar || (CodeBarWar = {}));
var CodeBarWar;
(function (CodeBarWar) {
    var Player = (function () {
        function Player() {
        }
        return Player;
    }());
    CodeBarWar.Player = Player;
})(CodeBarWar || (CodeBarWar = {}));

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
        };
        Preloader.prototype.create = function () {
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
            return _super.apply(this, arguments) || this;
        }
        Donjon.prototype.preload = function () {
            this.charJSON = this.game.cache.getJSON('characters');
            this.game.load.tilemap('donjon', 'assets/maps/donjon1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'assets/maps/tileset1.png');
        };
        Donjon.prototype.create = function () {
            this.game.stage.backgroundColor = '#787878';
            this.map = this.game.add.tilemap('donjon');
            this.map.addTilesetImage('Donjon1-1', 'tiles');
            this.layer = this.map.createLayer('Donjon1');
            this.layer.resizeWorld();
            this.layer.wrap = true;
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
    var CodeBarWarMain = (function (_super) {
        __extends(CodeBarWarMain, _super);
        function CodeBarWarMain() {
            var _this = _super.call(this, 1600, 900, Phaser.AUTO, 'content', null) || this;
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
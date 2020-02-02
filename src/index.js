const Phaser = require('phaser-ce');
const Gameplay = require('./states/gameplay');
const EndGame = require('./states/end-game');
const MenuBuyDrugs = require('./states/menu-buy-drugs');
const Input = require('./input');
const GameState = require("./game-state");

class JamGame extends Phaser.Game {
  constructor() {
    super(1024, 768, Phaser.AUTO, document.querySelector('body'), {
      preload() {
        this.game.state.add('end-game1', new EndGame(this.game, "Player 1"));
        this.game.state.add('end-game2', new EndGame(this.game, "Player 2"));
        this.game.state.add('gameplay', new Gameplay());
        this.game.state.add('menuBuyDrugs', new MenuBuyDrugs());
        this.game.world.setBounds(0, 0, 1920, 1920);
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;
      },
      create(){
        this.game.input.gamepad.start();

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.gameState = this.game.gameState = GameState.load();

        this.game.state.start('gameplay');
      }
    });

  }
}

window.game = new JamGame();

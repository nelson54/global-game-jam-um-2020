let Menu = require('./menu');
let _ = require('underscore');

class MenuBuyHammers extends Menu {

  constructor(game) {
    super(game, "Buy Hammers!", MenuBuyHammers.getHammers(game), Phaser.Keyboard.NINE);
  }

  static getHammers(game) {
    return _.pluck(game.gameState.current.gameState.hammers, 'name');
  }

}

module.exports = MenuBuyHammers;

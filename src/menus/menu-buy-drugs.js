let Menu = require('./menu');
let BuyDrugs = require('../buy/buy-drugs');
let _ = require('underscore');

class MenuBuyDrugs extends Menu {

  constructor(game) {
    super(game, "Buy Drugs!", MenuBuyDrugs.getDrugs(game), Phaser.Keyboard.EIGHT);
    this.buyService = BuyDrugs;
  }

  static getDrugs(game) {
    return _.toArray(game.gameState.current.gameState.drugs);
  }

}

module.exports = MenuBuyDrugs;

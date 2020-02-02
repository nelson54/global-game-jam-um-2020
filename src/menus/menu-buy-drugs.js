let Menu = require('./menu');
let _ = require('underscore');

class MenuBuyDrugs extends Menu {

  constructor(game) {
    super(game, "Buy Drugs!", MenuBuyDrugs.getDrugs(game), Phaser.Keyboard.EIGHT);
  }

  static getDrugs(game) {
    return _.pluck(game.gameState.current.gameState.drugs, 'display_name');
  }

}

module.exports = MenuBuyDrugs;

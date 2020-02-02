let Menu = require('./menu');
let _ = require('underscore');

class MenuBuyDrugs extends Menu {

  preload() {
    this.title = "Buy Drugs!";
    this.menuItems = _.pluck(game.gameState.gameState.drugs, 'display_name');

  }

}

module.exports = MenuBuyDrugs;

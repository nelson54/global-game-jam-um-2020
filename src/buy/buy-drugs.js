let _ = require('underscore');

class BuyDrugs {

  constructor(game) {
    this.drugList = game.gameState.current.gameState.drugs;
    this.playerDrugs = game.gameState.current.playerState.drugs;
    this.playerDoglars = game.gameState.current.playerState.doglars;
  }

  buy(drug) {
    let price = this.getPrice(drug);
    if (this.enoughDoglarsForDrug(price)) {
      this.subtractPlayerDoglars(price);
      this.playerIncreaseDrugsAvailable(drug);
    }
  }

  getPrice(drug) {
    if (drug in this.drugList) {
      return this.drugList[drug].price;
    } else {
      console.error("Drug does not exist");
    }
  }

  enoughDoglarsForDrug(price) {
    return this.playerDoglars >= price;
  }

  subtractPlayerDoglars(price) {
    this.playerDoglars -= price;
  }

  playerIncreaseDrugsAvailable(drug) {
    this.playerDrugs[drug].inventory++;
  }

}

module.exports = BuyDrugs;

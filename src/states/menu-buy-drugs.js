let Menu = require('./menu');


class MenuBuyDrugs extends Menu {

  constructor() {
    let title = "Buy Drugs!";
    let menuItems = [
      "Skeeze",
      "Chlorine Trifluoride",
      "F73-K12-B",
      "Canadian Frog"
    ];
    super(title, menuItems);
  }

}

module.exports = MenuBuyDrugs;

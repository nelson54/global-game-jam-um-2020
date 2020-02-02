let MenuText = require('./menu-text');
let _ = require('underscore');

class MenuBuyDrugs {

  constructor(game) {
    this.game = game;
    this.menuList = [];
    this.addKeys();
  }

  displayMenu() {
    if (!this.menuAlreadyDrawn()) {
      this.selectedItem = 0;
      this.drawTitle();
      this.drawList();
    }
  }

  menuAlreadyDrawn() {
    return this.menuList.length > 0;
  }

  addKeys() {
    let menuHotKey = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    menuHotKey.onDown.add(this.displayMenu, this);
    let up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    up.onDown.add(this.up, this);
    let down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    down.onDown.add(this.down, this);
    let enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enter.onDown.add(this.select, this);
    let escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    escape.onDown.add(this.escape, this);
  }

  drawTitle() {
    let title = "Buy Drugs!";
    this.title = this.game.add.text(0, 0, title, MenuText.getTitleStyle());
  };

  drawList() {
    let drugs = _.pluck(game.gameState.current.gameState.drugs, 'display_name');
    let positionX = this.game.world.centerX - 650;
    let positionY = 200;
    let menuItemPadding = 75;
    _.each(drugs, function(drug) {
      this.menuList.push(this.game.add.text(positionX, positionY, drug, MenuText.getMenuItemStyle()));
      positionY += menuItemPadding;
    }, this);
    this.menuList[this.selectedItem].setStyle(MenuText.getMenuItemHoverStyle());
  }

  up() {
    this.hoverOffCurrentSelected();
    this.selectedItem--;
    if (this.selectedItem < 0) {
      this.selectedItem = this.menuList.length -1;
    }
    this.menuList[this.selectedItem].setStyle(MenuText.getMenuItemHoverStyle(), true);
  }

  down() {
    this.hoverOffCurrentSelected();
    this.selectedItem++;
    if (this.selectedItem > this.menuList.length -1) {
      this.selectedItem = 0;
    }
    this.menuList[this.selectedItem].setStyle(MenuText.getMenuItemHoverStyle(), true);
  }

  select() {
    this.menuList[this.selectedItem].setStyle(MenuText.getMenuItemSelectStyle(), true);
  }

  escape() {
    this.title.destroy();
    _.each(this.menuList, function(text) {
      text.destroy();
    });
    this.menuList = [];
  }

  hoverOffCurrentSelected() {
    this.menuList[this.selectedItem].setStyle(MenuText.getMenuItemStyle(), true);
  }

}

module.exports = MenuBuyDrugs;

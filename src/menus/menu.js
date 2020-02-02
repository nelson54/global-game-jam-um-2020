let MenuText = require('./menu-text');
let _ = require('underscore');

class Menu {

  constructor(game, title, listItems, hotKey) {
    this.game = game;
    this.titleText = title;
    this.listItems = listItems;
    this.menuList = [];
    this.buyService = null;
    let menuHotKey = game.input.keyboard.addKey(hotKey);
    menuHotKey.onDown.add(this.displayMenu, this);
  }

  displayMenu() {
    if (!this.menuAlreadyDrawn()) {
      this.addKeys();
      this.selectedItem = 0;
      this.drawTitle();
      this.drawList();
    }
  }

  menuAlreadyDrawn() {
    return this.menuList.length > 0;
  }

  addKeys() {
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.upKey.onDown.add(this.up, this);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.downKey.onDown.add(this.down, this);
    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.enterKey.onDown.add(this.select, this);
    this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.escapeKey.onDown.add(this.escape, this);
  }

  drawTitle() {
    this.title = this.game.add.text(0, 0, this.titleText, MenuText.getTitleStyle());
  };

  drawList() {
    let positionX = this.game.world.centerX - 650;
    let positionY = 200;
    let menuItemPadding = 75;
    _.each(this.listItems, function(listItem) {
      this.menuList.push(this.game.add.text(positionX, positionY, listItem.display_name, MenuText.getMenuItemStyle()));
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
    if (this.buyService !== null) {
      let service = new this.buyService(this.game);
      service.buy(this.listItems[this.selectedItem].name);
    } else {
      console.error("Buy does not exist");
    }
    this.escape();
  }

  escape() {
    this.title.destroy();
    _.each(this.menuList, function(text) {
      text.destroy();
    });
    this.menuList = [];
    this.upKey.reset(true);
    this.downKey.reset(true);
    this.enterKey.reset(true);
    this.escapeKey.reset(true);
  }

  hoverOffCurrentSelected() {
    this.menuList[this.selectedItem].setStyle(MenuText.getMenuItemStyle(), true);
  }

}

module.exports = Menu;

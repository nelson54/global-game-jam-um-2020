let MenuText = require('./menu-text');
let _ = require('underscore');

class MenuBuyDrugs {

  constructor(game) {
    this.game = game;
    this.addKeys();
  }

  displayMenu() {
    this.drawTitle();
    this.drawMenu();
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

  drawMenu() {
    let menuItems = this.getMenuItems();
    let positionX = this.game.world.centerX - 650;
    let positionY = 200;
    let menuItemPadding = 75;
    this.menuText = [];
    this.selectedItem = 0;
    _.each(menuItems, function(menuItem) {
      this.menuText.push(this.game.add.text(positionX, positionY, menuItem.name, menuItem.style));
      positionY += menuItemPadding;
    }, this);
  }

  getMenuItems() {
    let itemNames = _.pluck(game.gameState.current.gameState.drugs, 'display_name');
    let menuItems = _.map(itemNames, function(itemName) {
      return {
        'name' : itemName,
        'style' : MenuText.getMenuItemStyle()
      }
    });
    menuItems[0].style = MenuText.getMenuItemHoverStyle();
    return menuItems;
  }

  up() {
    this.hoverOffCurrentSelected();
    this.selectedItem--;
    if (this.selectedItem < 0) {
      this.selectedItem = this.menuText.length -1;
    }
    this.menuText[this.selectedItem].setStyle(MenuText.getMenuItemHoverStyle(), true);
  }

  down() {
    this.hoverOffCurrentSelected();
    this.selectedItem++;
    if (this.selectedItem > this.menuText.length -1) {
      this.selectedItem = 0;
    }
    this.menuText[this.selectedItem].setStyle(MenuText.getMenuItemHoverStyle(), true);
  }

  select() {
    this.menuText[this.selectedItem].setStyle(MenuText.getMenuItemSelectStyle(), true);
  }

  escape() {
    this.title.destroy();
    _.each(this.menuText, function(text) {
      text.destroy();
    });
  }

  hoverOffCurrentSelected() {
    this.menuText[this.selectedItem].setStyle(MenuText.getMenuItemStyle(), true);
  }

}

module.exports = MenuBuyDrugs;

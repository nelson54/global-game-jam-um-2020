const Phaser = require('phaser-ce');
let MenuText = require('../menus/menu-text');

class Menu extends Phaser.State {

  preload(title, menuItems) {

    this.title = title;
    this.menuItems = menuItems;
  }

  create() {
    this.setBackground();
    this.setTitle();
    this.setMenuItems();
  }

  setBackground() {
    this.game.stage.backgroundColor = "#30b3ff";
  };

  setTitle() {
    this.game.add.text(0, 0, this.title, MenuText.getTitleStyle());
  };

  setMenuItems() {
    let positionX = this.game.world.centerX - 650;
    let positionY = 200;
    let menuItemPadding = 75;
    for (let menuIndex in this.menuItems) {
      this.game.add.text(
        positionX,
        positionY,
        this.menuItems[menuIndex],
        MenuText.getMenuItemStyle()
      );
      positionY += menuItemPadding;
    }

  }

}

module.exports = Menu;

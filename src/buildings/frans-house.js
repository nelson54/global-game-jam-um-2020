const Phaser = require('phaser-ce');
const Building = require('./building');
class FransHouse extends Building {
  constructor(game) {
    super(game, 1300, 670, 'frans-house', 300);

    this.scale.set(1, 1)

    //this.addChild(this.collmask);
  }
}

module.exports = FransHouse;

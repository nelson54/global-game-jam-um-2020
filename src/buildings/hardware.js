const Phaser = require('phaser-ce');
const Building = require('./building');
class Hardware extends Building {
  constructor(game) {
    super(game, 720, 1300, 'hardware');

    this.scale.set(1, 1)





    //this.addChild(this.collmask);
  }
}

module.exports = Hardware;

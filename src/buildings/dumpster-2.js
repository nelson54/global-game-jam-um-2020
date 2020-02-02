const Phaser = require('phaser-ce');
const Building = require('./building');
class Dumpster2 extends Building {
  constructor(game) {
    super(game, 1600, 100, 'dumpster2', 50, 50);

    this.scale.set(1, 1);


  }
}

module.exports = Dumpster2;

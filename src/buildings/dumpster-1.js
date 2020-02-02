const Phaser = require('phaser-ce');
const Building = require('./building');
class Dumpster1 extends Building {
  constructor(game) {
    super(game, 1400, 100, 'dumpster1', 50, 50);

    this.scale.set(1, 1);


  }
}

module.exports = Dumpster1;

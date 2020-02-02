const Phaser = require('phaser-ce');
const Building = require('./building');
class Workshop extends Building {
  constructor(game ) {
    super(game, 605, 638, 'workshop');
    this.scale.set(1, 1)

  }
}

module.exports = Workshop;

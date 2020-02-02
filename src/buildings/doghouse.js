const Phaser = require('phaser-ce');
const Building = require('./building');
class Doghouse extends Building {
  constructor(game) {
    super(game, 540, 130, 'doghouse', 30);

    this.scale.set(1, 1);


  }
}

module.exports = Doghouse;

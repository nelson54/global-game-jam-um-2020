const Building = require('./Building');
class Doghouse extends Building {
  constructor(game) {
    super(game, 440, 50, 'doghouse');

    this.scale.set(1.2, 1.2)
  }
}

module.exports = Doghouse;

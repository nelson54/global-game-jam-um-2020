const Building = require('./Building');
class FransHouse extends Building {
  constructor(game) {
    super(game, 1000, 400, 'frans-house');

    this.scale.set(10, 1.2)
  }
}

module.exports = FransHouse;

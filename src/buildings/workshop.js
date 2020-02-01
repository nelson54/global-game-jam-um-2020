const Building = require('./Building');
class Workshop extends Building {
  constructor(game) {
    super(game, 405, 488, 'workshop');

    this.scale.set(1, 1)
  }
}

module.exports = Workshop;

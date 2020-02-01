const Building = require('./building');
class Hardware extends Building {
  constructor(game) {
    super(game, 460, 1200, 'hardware');

    this.scale.set(1, 1)
  }
}

module.exports = Hardware;

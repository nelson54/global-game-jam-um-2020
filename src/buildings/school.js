const Building = require('./building');
class Hardware extends Building {
  constructor(game) {
    super(game, 1530, 1400, 'school');

    this.scale.set(1, 1);
  }
}

module.exports = Hardware;

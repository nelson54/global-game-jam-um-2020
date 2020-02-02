const Building = require('./building');
class Hardware extends Building {
  constructor(game, collisionGroup) {
    super(game, 1530, 1400, 'school', collisionGroup);

    this.scale.set(1, 1);
  }
}

module.exports = Hardware;

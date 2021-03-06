let Phaser = require('phaser-ce');

const HammerEffect = require('./hammer-effect');

class Hammer extends Phaser.Particle {
  constructor(game, x, y, hammer = 'stone', heals=10) {
    super(game, x, y, hammer);
    this.heals = heals;
  }

  hit(target) {
    new HammerEffect(this.game, this.x, this.y);
  }

  update() {
    if (this.alive) {

    }
  }
}

module.exports = Hammer;

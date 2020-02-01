var Phaser = require('phaser-ce');

class HammerEffect extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    super(game, x, y);
    this.makeParticles(['hammer-1', 'hammer-1', 'hammer-1', 'hammer-1', 'hammer-1', 'sparkle1', 'sparkle-2', 'sparkle-3'], 0);
    game.add.existing(this);

    this.setXSpeed(-100, 100);
    this.setYSpeed(-150, -50);

    this.minParticleScale = .1;
    this.maxParticleScale = .8;

    this.flow(1000, 250, 3, 5)
  }
}

module.exports = HammerEffect;

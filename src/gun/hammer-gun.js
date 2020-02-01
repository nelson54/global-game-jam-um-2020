const Phaser = require('phaser-ce');
const Gun = require('./gun');
const Hammer = require('./hammer');

class HammerGun extends Gun {
  constructor(game) {
    super(game);

    this.particleClass = Hammer;
    this.maxParticles = 100;

    this.makeParticles(undefined, undefined, undefined, undefined, true);
    this.gravity = 0;

    this.sound = game.boop;

    this.bulletSpeed = 800;
    this.cooldown = 200;

    game.add.existing(this);
  }
}

module.exports = HammerGun;

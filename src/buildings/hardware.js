const Phaser = require('phaser-ce');
const Building = require('./building');
class Hardware extends Building {
  constructor(game) {
    super(game, 460, 1200, 'hardware');

    this.scale.set(1, 1)

    this.collmask = new Phaser.Sprite(game, 0, 0, 'hardware.mask');
    game.physics.arcade.enable(this.collmask);
    this.collmask.enableBody = true;
    this.collmask.alpha = .5;
    this.addChild(this.collmask);
  }
}

module.exports = Hardware;

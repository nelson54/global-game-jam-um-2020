const Phaser = require('phaser-ce');
const Building = require('./building');
class Hardware extends Building {
  constructor(game) {
    super(game, 460, 1200, 'hardware');

    this.scale.set(1, 1)

    this.collmask = new Phaser.Sprite(game, 0, 0, 'hardware.mask');
    this.collmask.scale.set(this.scale.x, this.scale.y)
    game.physics.arcade.enable(this.collmask);
    this.collmask.enableBody = true;

    this.addChild(this.collmask);
  }
}

module.exports = Hardware;

const Phaser = require('phaser-ce');
const Building = require('./building');
class Doghouse extends Building {
  constructor(game) {
    super(game, 440, 50, 'doghouse');

    this.scale.set(1.2, 1.2)

    this.collmask = new Phaser.Sprite(game, 0, 0, 'doghouse.mask');
    this.collmask.scale.set(this.scale.x, this.scale.y)
    game.physics.arcade.enable(this.collmask);
    this.collmask.enableBody = true;

    this.addChild(this.collmask);

  }
}

module.exports = Doghouse;

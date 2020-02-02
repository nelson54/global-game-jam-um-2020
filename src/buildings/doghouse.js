const Phaser = require('phaser-ce');
const Building = require('./building');
class Doghouse extends Building {
  constructor(game) {
    super(game, 440, 50, 'doghouse');

    this.scale.set(1.2, 1.2);

    this.collmask = new Phaser.Sprite(game, 0, 0, 'doghouse.mask');
    game.physics.arcade.enable(this.collmask);
    this.collmask.alpha = .5;
    this.collmask.enableBody = true;

    this.addChild(this.collmask);

  }
}

module.exports = Doghouse;

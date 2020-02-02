const Phaser = require('phaser-ce');
const Building = require('./building');
class Workshop extends Building {
  constructor(game) {
    super(game, 405, 488, 'workshop');

    this.scale.set(1, 1)

    this.collmask = new Phaser.Sprite(game, 0, 0, 'workshop.mask');
    this.collmask.scale.set(this.scale.x, this.scale.y)
    game.physics.arcade.enable(this.collmask);
    this.collmask.enableBody = true;

    this.addChild(this.collmask);
  }
}

module.exports = Workshop;

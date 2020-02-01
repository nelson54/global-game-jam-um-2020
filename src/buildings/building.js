const Phaser = require('phaser-ce');

class Building extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    game.physics.arcade.enable(this);

    this.enableBody = true;
    game.add.existing(this);

    //this.anchor.set(.5, .5);
  }
}

module.exports = Building;

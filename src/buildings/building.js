const Phaser = require('phaser-ce');

class Building extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.alpha = .2;
    game.add.existing(this);

    //this.anchor.set(.5, .5);
  }
}

module.exports = Building;

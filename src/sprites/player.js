const Phaser = require('phaser-ce');
const Input = require('../input');
const HammerGun = require('../gun/hammer-gun');

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);

    this.anchor.set(0.2, 0.5);

    this.angle = 180;

    game.add.existing(this);
  }

  update() {
    super.update();
  }
}


module.exports = Player;

const Phaser = require('phaser-ce');

class TruckHudModule extends Phaser.Sprite {
  constructor(game, x=0, y=0) {
    super(game, x, y, 'truck-side');
  }
}

module.exports = TruckHudModule;

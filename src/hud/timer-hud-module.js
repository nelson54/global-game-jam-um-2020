const Phaser = require('phaser-ce');

class TimerHudModule extends Phaser.Sprite {
  constructor(game, x=0, y=0) {
    super(game, x, y, '');

  }
}

module.exports = TimerHudModule;

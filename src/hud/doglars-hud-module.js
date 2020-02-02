const Phaser = require('phaser-ce');

class DoglarsHudModule extends Phaser.Sprite {
  constructor(game, x=0, y=0, style) {
    super(game, x, y, 'doglar');
    this.doglars = new Phaser.Text(game, this.width, this.height, "100", style);
    this.doglars.anchor.set(.5);

    this.doglars.scale.set(3);

    this.scale.set(.3);
    this.addChild(this.doglars)
  }

  updateValue(amount) {
    this.doglars.text = amount
  }
}

module.exports = DoglarsHudModule;

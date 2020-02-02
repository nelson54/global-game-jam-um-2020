
class Bar extends Phaser.Sprite {
  constructor(game, x, y, width, numerator, denominator) {
    super(game, x, y, 'transparent');

    this.width = width;

    this.numerator = numerator;
    this.denominator = denominator;

    parent.addChild(this);
  }

  changeValue,

}

module.exports = Bar;

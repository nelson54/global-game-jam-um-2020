
class Bar extends Phaser.Sprite {
  constructor(game, x, y, width, numerator, denominator) {
    super(game, x, y, 'transparent');

    this.width = width;

    this.leftSprite = new Phaser.Sprite(game, 0, 0, 'red');
    this.rightSprite = new Phaser.Sprite(game, 0, 0, 'red');

    this.updateValues(numerator, denominator);

    parent.addChild(this);
  }

  updateValues(numerator, denominator){
    this.numerator = numerator;
    this.denominator = denominator;

    let leftWidth = (numerator/denominator) * this.width;
    let rightWidth =

    this.leftSprite
  }

}

module.exports = Bar;

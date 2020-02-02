
class Bar extends Phaser.Sprite {
  constructor(parent, x, y, numerator, denominator, width=100, height=20) {
    super(parent.game, x, y, 'transparent');

    this.width = width;
    this.height = height;
    this.leftSprite = new Phaser.Sprite(game, 0, 0, 'green');
    this.rightSprite = new Phaser.Sprite(game, 0, 0, 'red');

    this.leftSprite.height = this.rightSprite.height = height;

    this.updateValues(numerator, denominator);

    parent.addChild(this);

  }

  updateValues(numerator, denominator) {
    this.leftSprite.width = this.rightSprite.x = (numerator / denominator) * this.width;
    this.rightSprite.width = this.width - this.leftSprite.width;
  }
}

module.exports = Bar;

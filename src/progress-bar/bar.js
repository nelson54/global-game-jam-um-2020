const Phaser = require('phaser-ce');

class Bar extends Phaser.Sprite {
  constructor(parent, x, y, width=200, height=20) {
    super(parent.game, x, y, 'transparent');

    this.width = width;
    this.height = height;

    this.leftSprite = new Phaser.TileSprite(game, 0, 0, 1, 1, 'green');
    this.rightSprite = new Phaser.TileSprite(game, 1, 0, 0, 1, 'red');

    this.addChild(this.leftSprite);
    this.addChild(this.rightSprite);

    parent.addChild(this);
  }

  updateValues(numerator, denominator) {
    this.leftSprite.width = this.rightSprite.x = (numerator / denominator);
    this.rightSprite.width = 1 - this.rightSprite.x;

  }
}

module.exports = Bar;

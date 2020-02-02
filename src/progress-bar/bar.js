const Phaser = require('phaser-ce');

class Bar extends Phaser.Sprite {
  constructor(game, x, y, width=100, height=20) {
    super(game, x, y, 'transparent');

    this.width = width;
    this.height = height;
    
    this.leftSprite = new Phaser.Sprite(game, 0, 0, 'red');
    this.rightSprite = new Phaser.Sprite(game, 0, 0, 'green');
    this.leftSprite.height = this.rightSprite.height = height;
    this.addChild(this.leftSprite);
    //this.addChild(this.rightSprite);
  }

  updateValues(numerator, denominator) {
    this.rightSprite.x = this.leftSprite.width = (numerator / denominator) * this.width;
    this.rightSprite.width = this.width - this.leftSprite.width;
    alert(this.leftSprite.width);
  }
}

module.exports = Bar;

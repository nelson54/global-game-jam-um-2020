const Phaser = require('phaser-ce');

class HammerHudModule extends Phaser.Sprite {
  constructor(game, x=550, y=10, style) {
    super(game, x, y, '');

    this.width = 150;
    this.height = 150;
    this.scale.set(1);

    this.arrowUp = new Phaser.Sprite(this.game, .5, 0, 'hud/up');
    this.arrowUp.scale.set(0.75);
    this.addChild(this.arrowUp);

    this.hammer = new Phaser.Sprite(this.game, 20, 70, 'hammer-1');
    this.hammer.anchor.set(0.5, 0.5);
    this.hammer.scale.set(0.175);
    this.addChild(this.hammer);

    this.arrowDown = new Phaser.Sprite(this.game, .5, 110, 'hud/down');
    this.arrowDown.scale.set(0.75);
    this.addChild(this.arrowDown);

    style.fill= "#ff0000";
    this.count = new Phaser.Text(game, 80, 80, "100", style);
    this.count.anchor.set(1, 0);
    this.addChild(this.count);

  }

  updateValue(hammer, count) {
    this.hammer.loadTexture('hammers/' + hammer);
    this.count = count
  }
}

module.exports = HammerHudModule;

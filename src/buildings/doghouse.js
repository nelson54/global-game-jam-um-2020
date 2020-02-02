const Phaser = require('phaser-ce');
const Building = require('./building');
class Doghouse extends Building {
  constructor(game, collisionGroup) {
    super(game, 440, 50, 'doghouse');

    this.scale.set(1.2, 1.2);

    this.collmask = new Phaser.Sprite(game, 0, 0, 'doghouse.mask');
    this.collmask.enableBody = true;
    this.collmask.physicsBodyType = Phaser.Physics.P2JS;
    this.collmask.body.setCollisionGroup(collisionGroup);
    this.collmask.alpha = .5;
    this.collmask.body.immovable = true;
    this.addChild(this.collmask);

  }
}

module.exports = Doghouse;

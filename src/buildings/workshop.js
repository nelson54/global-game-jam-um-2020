const Phaser = require('phaser-ce');
const Building = require('./building');
class Workshop extends Building {
  constructor(game, collisionGroup) {
    super(game, 405, 488, 'workshop');

    this.scale.set(1, 1)

    this.collmask = new Phaser.Sprite(game, 0, 0, 'workshop.mask');
    this.collmask.enableBody = true;
    this.collmask.physicsBodyType = Phaser.Physics.P2JS;
    this.collmask.body.setCollisionGroup(collisionGroup);
    this.collmask.alpha = .5;
    this.collmask.body.immovable = true;
    this.addChild(this.collmask);
  }
}

module.exports = Workshop;

const Phaser = require('phaser-ce');
const Building = require('./building');
class Doghouse extends Building {
  constructor(game, buildingMasks, collisionGroup) {
    super(game, 440, 50, 'doghouse');

    this.scale.set(1.2, 1.2);

    this.collmask = buildingMasks.create(this.x, this.y, 'doghouse.mask');
    this.collmask.scale.set(this.scale.x, this.scale.y);
    this.collmask.anchor.set(0);
    this.collmask.body.setCollisionGroup(collisionGroup);
    this.collmask.body.static = true;
    this.collmask.alpha = .5;
    this.collmask.body.immovable = true;
    //this.addChild(this.collmask);

  }
}

module.exports = Doghouse;

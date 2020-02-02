const Phaser = require('phaser-ce');
const Building = require('./building');
class FransHouse extends Building {
  constructor(game, buildingMasks, collisionGroup) {
    super(game, 1000, 400, 'frans-house');

    this.scale.set(1.2, 1.2)

    this.collmask = buildingMasks.create(this.x, this.y, 'frans-house.mask');
    this.collmask.scale.set(this.scale.x, this.scale.y);
    this.collmask.scale.set(this.scale.x, this.scale.y);
    this.collmask.anchor.set(0);
    this.collmask.body.setCollisionGroup(collisionGroup);
    this.collmask.body.static = true;
    this.collmask.alpha = .5;
    this.collmask.body.immovable = true;
    //this.addChild(this.collmask);
  }
}

module.exports = FransHouse;

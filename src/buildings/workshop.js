const Phaser = require('phaser-ce');
const Building = require('./building');
class Workshop extends Building {
  constructor(game, buildingMasks, collisionGroup) {
    super(game, 405, 488, 'workshop');

    this.scale.set(1, 1)

    this.collmask = buildingMasks.create(this.x, this.y, 'workshop.mask');
    this.collmask.scale.set(this.scale.x, this.scale.y);
    this.collmask.anchor.set(0);
    this.collmask.body.setCollisionGroup(collisionGroup);
    this.collmask.body.static = true;
    this.collmask.alpha = .5;
    this.collmask.body.immovable = true;
    //this.addChild(this.collmask);
  }
}

module.exports = Workshop;

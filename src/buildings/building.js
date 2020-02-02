const Phaser = require('phaser-ce');

class Building extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.name = key;
    this.alpha = .8;

    game.add.existing(this);
  }

  addPhysics(collisionGroup) {
    this.game.physics.p2.enable(this, true);

    this.body.clearShapes();
    this.body.static = true;
    this.body.loadPolygon('physicsData', this.name);
    //this.anchor.set(.5, .5);
    this.body.setCollisionGroup(collisionGroup);
  }
}

module.exports = Building;

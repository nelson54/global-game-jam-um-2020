const Phaser = require('phaser-ce');

class Building extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.name = key;

    game.add.existing(this);
  }

  addPhysics() {
    this.body.static = true;
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', this.name);
  }
}

module.exports = Building;

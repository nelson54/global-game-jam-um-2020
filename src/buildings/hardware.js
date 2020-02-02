const Phaser = require('phaser-ce');
const Building = require('./building');
class Hardware extends Building {
  constructor(game, collisionGroup) {
    super(game, 670, 1300, 'hardware', collisionGroup);

    this.scale.set(1, 1)





    //this.addChild(this.collmask);
  }
}

module.exports = Hardware;

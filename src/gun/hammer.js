let Phaser = require('phaser-ce');
let Bullet = require('./bullet');

const HammerEffect = require('./hammer-effect');

class Hammer extends Bullet {
  constructor(game, x, y, hammer='hammer-1', heals=10) {
    super(game, x, y, hammer);



    this.heals = 10;
  }

  hit(target) {
    super.hit();//target
    new HammerEffect(this.game, this.x, this.y);
    //this.game.rocketLaunch.play();
  }
}

module.exports = Hammer;

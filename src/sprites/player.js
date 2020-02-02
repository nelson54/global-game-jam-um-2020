const Phaser = require('phaser-ce');
const Input = require('../input');
const HammerGun = require('../gun/hammer-gun');

function mapCurve(x) {
  return Math.max(Math.min(x * x, 1), 0);
}

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    game.add.existing(this);

    this.length = 0.6 * this.width;

    this.velocity = 0.0;

    game.physics.p2.enable(this, game.gameState.debug);
    this.body.collideWorldBounds = true;
    this.body.clearShapes();
    let data = game.cache.getPhysicsData('physicsData', 'truck');
    for (let i = 0; i < data[0].shape.length / 2; i++) {
      data[0].shape[2 * i + 0] -= 0.25 * this.width;
    }
    this.body.loadPolygon(null, data);
    this.body.angle = 180;

    this.anchor.set(0.75, 0.5);
  }

  update() {
    super.update();

    let movement = this.controller.movement;
    let steer = movement.x;
    let gas = mapCurve(movement.y);
    let reverse = this.controller.isDown(Input.Buttons.REVERSE);
    let braking = (this.velocity > 0.0 && reverse) || this.controller.isDown(Input.Buttons.BRAKE);

    const turningRange = 40;
    let turn = steer * turningRange;

    let baseTurn = Math.abs(this.velocity) > 0 ? Math.atan(
      this.velocity * Math.sin(turn * Math.PI / 180.0) /
      (this.velocity * Math.cos(turn * Math.PI / 180.0) + this.length)
    ) : 0.0;

    const gasAcceleration = 0.15;
    const dampening = 0.01;
    const brakeDampening = 0.075;

    this.velocity += (reverse ? 0 : gas) * gasAcceleration;
    this.velocity *= (1.0 - dampening);
    if (reverse && this.velocity < 0.05) {
      this.velocity -= 0.05;
    }
    if (braking) {
      this.velocity *= (1.0 - brakeDampening);
    }

    let vector = {
      x: -this.velocity * Math.cos(2 * baseTurn) * Math.cos(this.rotation + baseTurn),
      y: -this.velocity * Math.cos(2 * baseTurn) * Math.sin(this.rotation + baseTurn),
    };

    this.velocity = Math.sign(this.velocity) * Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    this.body.setZeroVelocity();
    this.body.moveRight(50 * vector.x);
    this.body.moveDown(50 * vector.y);
    this.body.setZeroRotation();
    this.body.rotateRight(30 * 180 * baseTurn / Math.PI);

    if (this.controller.isDown(Input.Buttons.YES)) {
      console.log(this.velocity);
      console.log(this.body.velocity.x);
    }
  }
}


module.exports = Player;

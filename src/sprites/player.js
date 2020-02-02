const Phaser = require('phaser-ce');
const Input = require('../input');
const HammerGun = require('../gun/hammer-gun');

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);

    this.scale.set(0.4);
    this.anchor.set(0.75, 0.5);
    this.angle = 180;

    this.length = 0.6 * this.width;

    this.velocity = 0.0;

    game.add.existing(this);
  }

  update() {
    super.update();

    let movement = this.controller.movement;
    let steer = movement.x;
    let gas = movement.y;
    let reverse = this.controller.isDown(Input.Buttons.REVERSE);
    let braking = this.controller.isDown(Input.Buttons.BRAKE);

    const turningRange = 40;
    let turn = steer * turningRange;

    let baseTurn = Math.abs(this.velocity) > 0 ? 180.0 * Math.atan(
      this.velocity * Math.sin(turn * Math.PI / 180.0) /
      (this.velocity * Math.cos(turn * Math.PI / 180.0) + this.length)
    ) / Math.PI : 0.0;

    const gasAcceleration = 0.15;
    const dampening = 0.01;
    const brakeDampening = 0.15;

    this.velocity += (reverse ? -gas : gas) * gasAcceleration;
    this.velocity *= (1.0 - dampening);
    if (braking) {
      this.velocity *= (1.0 - brakeDampening);
    }

    let vector = {
      x: -this.velocity * Math.cos(this.rotation + baseTurn * Math.PI / 180.0),
      y: -this.velocity * Math.sin(this.rotation + baseTurn * Math.PI / 180.0),
    };

    this.x += vector.x;
    this.y += vector.y;
    this.angle += baseTurn;
  }
}


module.exports = Player;

const Phaser = require('phaser-ce');
const Input = require('../input');
const HammerGun = require('../gun/hammer-gun');

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);

    this.scale.set(0.5);
    this.anchor.set(0.8, 0.5);
    this.angle = 180;

    this.velocity = 0.0;
    this.target_angle = this.angle;

    game.add.existing(this);
  }

  update() {
    super.update();

    let movement = this.controller.movement;
    let steer = movement.x;
    let gas = movement.y;
    let reverse = this.controller.isDown(Input.Buttons.REVERSE);
    let braking = (this.velocity > 0.0 && reverse || this.velocity < 0.0 && !reverse) || this.controller.isDown(Input.Buttons.BRAKE);

    const turning_speed = 0.3;
    let turn = steer * turning_speed * Math.abs(this.velocity);
    if (turn != 0.0) {
      this.target_angle = this.angle + turn;
    }

    const gas_acceleration = 0.15;
    this.velocity += (reverse ? -gas : gas) * gas_acceleration;
    this.velocity *= 0.98;
    if (braking) {
      this.velocity *= 0.8;
    }

    let vector = {
      x: this.velocity * Math.cos(this.rotation + turn * Math.PI / 180.0),
      y: this.velocity * Math.sin(this.rotation + turn * Math.PI / 180.0),
    };

    this.x += vector.x;
    this.y += vector.y;
    this.angle += turn;

    if (this.controller.isDown(Input.Buttons.YES)) {
      console.log(Math.cos(turn * Math.PI / 180.0));
      console.log(this.rotation);
      console.log(vector);
    }
  }
}


module.exports = Player;

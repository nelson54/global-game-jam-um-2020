const Phaser = require('phaser-ce');
const Input = require('../input');
const HammerGun = require('../gun/hammer-gun');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, x, y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 200;
    this.movementSpeed = 300;

    this.look = 0.0;

    game.physics.arcade.enable(this);

    this.enableBody = true;
    this.body.collideWorldBounds=true;

    game.add.existing(this);

    this.healthText = game.add.text(
      text_x,
      text_y,
      null,
      {
        "fill": text_color,
        "align": "center",
        "font": "bold 20pt Comic Sans MS",
        "strokeThickness": 8
      });

      this.weapon = new HammerGun(game)
  }

  set weapon(new_weapon) {
    if (this._weapon) {
      this._weapon.unequipFrom(this);
    }
    if (new_weapon) {
      new_weapon.equipTo(this)
    }
    this._weapon = new_weapon;
  }

  get weapon() {
    return this._weapon;
  }

  update() {
    super.update();

    if (this.controller && this.controller.active) {
      this.body.velocity.x = this.controller.strafe.x * this.movementSpeed;
      this.body.velocity.y = this.controller.strafe.y * this.movementSpeed;

      if (this.controller.isDown(Input.Buttons.PRIMARY) && this.weapon) {
        this.weapon.use();
      }
    }

    // Bring our weapon with us
    if (this.weapon) {
      this.weapon.update();
    }
  }
}


module.exports = Player;

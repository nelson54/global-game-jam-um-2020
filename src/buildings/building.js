const Phaser = require('phaser-ce'),
Bar = require('../progress-bar/bar');

class Building extends Phaser.Sprite {
  constructor(game, x, y, key, health = 100, maxHealth = 100) {
    super(game, x, y, key);
    this.name = key;

    game.add.existing(this);
    this.healthBar = new Bar(game, x - (this.width * .5 + 20), y - (this.height * .5 + 20), 200, 10);
    this.maxHealth = maxHealth;
    this.health = health;
    this.healthBar.updateValues(health, maxHealth);



  }

  addPhysics() {
    this.body.static = true;
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', this.name);
    this.body.setCollisionGroup(this.game.buildingsCollisionGroup);

    this.body.collides([this.game.playerCollisionGroup]);
  }

  heal(amount) {
    this.health += amount;

    this.healthBar.updateValues(this.health, this.maxHealth);
  }

  getDamage() {
    if(this.health < 0) {
      this.destroy();
    }
    return this.maxHealth - this.health;
  }
}

module.exports = Building;

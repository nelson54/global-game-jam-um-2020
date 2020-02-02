const Phaser = require('phaser-ce');
const Input = require('../input');

function mapCurve(x) {
  return Math.max(Math.min(x * x, 1), 0);
}

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);

    game.add.existing(this);

    this.length = 0.6 * this.width;

    this.velocity = 0.0;

    game.playerCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.enable(this, game.gameState.debug);
    this.body.collideWorldBounds = true;
    this.body.clearShapes();
    let data = game.cache.getPhysicsData('physicsData', 'truck');
    for (let i = 0; i < data[0].shape.length / 2; i++) {
      data[0].shape[2 * i + 0] -= 0.25 * this.width;
    }
    this.body.loadPolygon(null, data);
    this.body.angle = 180;

    this.body.setCollisionGroup(game.playerCollisionGroup);

    this.anchor.set(0.75, 0.5);
  }

  equipSquirter(squirter) {
    this.squirter = squirter;
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

    var skeeze = (10 * this.game.gameState.current.playerState.drugs.skeeze.dosage) + 1;

    var gasAcceleration = 0.15 * skeeze;
    var dampening = 0.01;
    var brakeDampening = 0.075 * skeeze;

    this.velocity += (reverse ? 0 : gas) * gasAcceleration;
    this.velocity *= (1.0 - dampening);
    if (reverse && this.velocity < 0.05) {
      this.velocity -= 0.075 * skeeze;
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
    this.body.rotateRight(20 * 180 * baseTurn / Math.PI);

    let activeDrug = this.game.gameState.current.playerState.drugs[this.game.gameState.current.playerState.activeDrug];
    if (this.controller.justPressed(Input.Buttons.CHANGE_DRUG_FORWARD)) {
      this.game.gameState.current.playerState.activeDrug = activeDrug.next;

    } else if(this.controller.justPressed(Input.Buttons.CHANGE_DRUG_BACKWARD)) {
      this.game.gameState.current.playerState.activeDrug = activeDrug.prev;
    }

    if (this.controller.justPressed(Input.Buttons.TAKE_DRUG)) {
      let activeDrugName = this.game.gameState.current.playerState.activeDrug;
      this.game.gameState.current.playerState.drugs[activeDrugName].dosage++;
      console.log(this.game.gameState.current.playerState.drugs[activeDrugName].dosage);
    }

    let activeHammer = this.game.gameState.current.gameState.hammers[this.game.gameState.current.playerState.activeHammer];
    if (this.controller.justPressed(Input.Buttons.CHANGE_HAMMER_FORWARD)) {
      this.game.gameState.current.playerState.activeHammer = activeHammer.next
    } else if(this.controller.justPressed(Input.Buttons.CHANGE_HAMMER_BACKWARD)) {
      this.game.gameState.current.playerState.activeHammer = activeHammer.prev
    }

    if (this.controller.isDown(Input.Buttons.SQUIRT)) {
      let fired = this.squirter.use();

      if (fired) {
        for (let b in this.game.buildings) {
          let building = this.game.buildings[b];

          let vector = {
            x: -Math.cos(this.rotation),
            y: -Math.sin(this.rotation),
          };

          let offset = {
            x: building.x - this.x,
            y: building.y - this.y,
          };

          let distance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
          let dot = vector.x * (offset.x / distance) + vector.y * (offset.y / distance);

          if (dot > 0.9 && distance - this.length <= Math.min(building.width, building.height)) {
            building.heal(activeHammer.repairValue);
          }
        }
      }
    }
  }

  hitBuilding(_playerBody, buildingBody) {
    let velocity = Math.abs(this.velocity);

    this.game.gameState.current.playerState.health -= (velocity * .5);
    buildingBody.sprite.heal(-velocity);
    this.velocity = 0;
  }
}


module.exports = Player;

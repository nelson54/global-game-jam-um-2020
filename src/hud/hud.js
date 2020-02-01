const Phaser = require('phaser-ce'),
DoglarsHudModule = require('./doglars-hud-module'),
  DrugHudModule = require('./drug-hud-module'),
  HammerHudModule = require('./hammer-hud-module'),
  HealthHudModule = require('./health-hud-module'),
  TimerHudModule = require('./timer-hud-module'),
  TruckHudModule = require('./timer-hud-module');


class Hud extends Phaser.Sprite {
  constructor(game, x=0, y=0) {
    super(game, x, y, 'transparent');
    this.fixedToCamera = true;

    this.addChild(new TruckHudModule(game));

    game.add.existing(this);
  }
}

module.exports = Hud;

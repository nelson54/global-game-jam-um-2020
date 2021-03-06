const Phaser = require('phaser-ce'), 
  GameState = require('../game-state'),
  Bar = require('../progress-bar/bar'),
  HammerHudModule = require('./hammer-hud-module'),
  DoglarsHudModule = require('./doglars-hud-module');


class Hud extends Phaser.Group {
  newAt(game, name, x, y, w) {
    var obj = new Phaser.Sprite(game, x, y, name);
    obj.height = obj.height * w / obj.width;
    obj.width = w;
    this.addChild(obj);
  }

  arrow(x, y, name) {
    var result = new Phaser.Sprite(this.game, x, y, name);
    result.scale.set(0.75);
    this.addChild(result);
    return result;
  }

  constructor(game, x=0, y=0) {
    super(game, x, y);
    this.fixedToCamera = true;

    var style = {font: "normal 20pt Arial Black"};

    this.newAt(game, 'hud/truck-side', 10, 20, 120);
    //this.addChild(new Phaser.Text(this.game, 30, 120, "Health", style));

    this.healthBar = new Bar(this, 10, 80, 150, 10);
    this.healthBar.updateValues(100, 100);

    this.arrowLeft = this.arrow(160, 50, 'hud/left');
    this.drug = new Phaser.Sprite(this.game, 260, 60, 'drugs/skeeze');
    this.drug.anchor.set(0.5, 0.5);
    this.drug.scale.set(0.25);
    this.addChild(this.drug);
    this.arrowRight = this.arrow(330, 50, 'hud/right');

    // this.health = new Bar(this.game, 10, 0);
    this.health = new Phaser.Text(this.game, 60, 90, "", style);
    this.addChild(this.health);


    this.doglarModule = new DoglarsHudModule(game, 750, 20, style);
    this.addChild(this.doglarModule);

    this.hammerModule = new HammerHudModule(game, 900, 10, style);
    this.addChild(this.hammerModule);

    this.updateWith(game.gameState.current); // TODO.

    game.add.existing(this);
  }

  updateWith(state) {

    this.healthBar.updateValues(state.playerState.health, state.gameState.player.healthMax);
    this.health.text = Math.floor(state.playerState.health);

    let drug = state.playerState.activeDrug;
    this.drug.loadTexture(drug == null ? 'hud/no' : 'drugs/' + drug);

    let hammer = state.playerState.activeHammer;
    this.hammerModule.updateValue(hammer, state.playerState.hammers[hammer]);
    this.doglarModule.updateValue(state.playerState.doglars);
  }
}

module.exports = Hud;

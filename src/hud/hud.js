const Phaser = require('phaser-ce'), 
  GameState = require('../game-state'),
  Bar = require('../progress-bar/bar');


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
    this.addChild(new Phaser.Text(this.game, 30, 120, "Health", style));

    this.arrowLeft = this.arrow(160, 50, 'hud/left');
    this.drug = new Phaser.Sprite(this.game, 260, 60, 'drugs/skeeze');
    this.drug.anchor.set(0.5, 0.5);
    this.drug.scale.set(0.25);
    this.addChild(this.drug);
    this.arrowRight = this.arrow(330, 50, 'hud/right');

    this.arrowUp = this.arrow(550, 10, 'hud/up');
    this.hammer = new Phaser.Sprite(this.game, 580, 80);
    this.hammer.anchor.set(0.5, 0.5);
    this.hammer.scale.set(0.175);
    this.addChild(this.hammer);
    this.arrowDown = this.arrow(550, 120, 'hud/down');

    // this.health = new Bar(this.game, 10, 0);
    this.health = new Phaser.Text(this.game, 60, 90, "", style);
    this.addChild(this.health);

    style.fill= "#ff0000";
    this.hammers = new Phaser.Text(game, 650, 20, "", style);
    this.addChild(this.hammers);
    style.fill = "#0000ff";
    this.doglars = new Phaser.Text(game, 650, 50, "", style);
    this.addChild(this.doglars);

    this.updateWith(game.gameState.current); // TODO.

    game.add.existing(this);
  }

  updateWith(state) {
    this.health.text = state.playerState.health;

    var drug = state.playerState.activeDrug;
    this.drug.loadTexture(drug == null ? 'hud/no' : 'drugs/' + drug);

    var hammer = state.playerState.activeHammer;
    this.hammer.loadTexture('hammers/' + hammer);

    this.hammers.text = 'H: ' + state.playerState.hammers[hammer];
    this.doglars.text = '$: ' + state.playerState.doglars;
  }
}

module.exports = Hud;

const Phaser = require('phaser-ce');
const Player = require('../sprites/player');
const Input = require('../input');
const Buildings = require('../buildings/buildings');
const Hud = require('../hud/hud');
const MenuBuyDrugs = require('../menus/menu-buy-drugs');
const MenuBuyHammers = require('../menus/menu-buy-hammers');
const HammerSquirter = require('../hammer-squirter/hammer-squirter');

class Gameplay extends Phaser.State {
  preload() {
    game.load.physics('physicsData', '/assets/physics/sprites.json');

    this.game.load.image('transparent', '/assets/nil.png');
    this.game.load.image('red', '/assets/bars/red.png');
    this.game.load.image('green', '/assets/bars/green.png');
    this.game.load.image('doglar', '/assets/coin.png');

    this.game.load.image('hammer-1', '/assets/sprites/regular_hammer.png');

    this.game.load.image('sparkle-1', '/assets/effects/yellow1.png');
    this.game.load.image('sparkle-2', '/assets/effects/yellow2.png');
    this.game.load.image('sparkle-3', '/assets/effects/yellow3.png');

    this.game.load.image('white-sparkle-1', '/assets/effects/white1.png');
    this.game.load.image('white-sparkle-2', '/assets/effects/white2.png');
    this.game.load.image('white-sparkle-3', '/assets/effects/white3.png');

    this.game.load.image('frans-house', '/assets/buildings/frans-house.png');
    this.game.load.image('workshop', '/assets/buildings/workshop.png');
    this.game.load.image('hardware', '/assets/buildings/hardware.png');
    this.game.load.image('doghouse', '/assets/buildings/doghouse.png');
    this.game.load.image('school', '/assets/buildings/school.png');

    this.game.load.image('truck', '/assets/sprites/truck.png');

    this.game.load.image('hud/truck-side', '/assets/hud/truck-side.png');
    this.game.load.image('hud/left', '/assets/hud/left.png');
    this.game.load.image('hud/up', '/assets/hud/up.png');
    this.game.load.image('hud/right', '/assets/hud/right.png');
    this.game.load.image('hud/down', '/assets/hud/down.png');
    this.game.load.image('hud/no', '/assets/hud/no.png');

    this.game.load.image('drugs/skeeze', '/assets/drugs/skeeze.png');
    this.game.load.image('drugs/clf3', '/assets/drugs/clf3.png');
    this.game.load.image('drugs/f73_k12_b', '/assets/drugs/f73_k12_b.png');
    this.game.load.image('drugs/canadian_frog', '/assets/drugs/canadian_frog.png');

    this.game.load.image('hammers/ball_peen', '/assets/hammers/ball_peen.png');
    this.game.load.image('hammers/brick', '/assets/hammers/brick.png');
    this.game.load.image('hammers/dildo', '/assets/hammers/dildo.png');
    this.game.load.image('hammers/golden', '/assets/hammers/golden.png');
    this.game.load.image('hammers/regular', '/assets/hammers/regular.png');
    this.game.load.image('hammers/rock', '/assets/hammers/rock.png');

    this.game.load.image('map', 'assets/map.png');
  }

  create() {
    this.game.input.enabled = true;
    let input = new Input.XBoxController(this.input.gamepad.pad1);
    let drugMenu = new MenuBuyDrugs(this.game);
    let hammerMenu = new MenuBuyHammers(this.game);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.9;

    this.game.add.tileSprite(0, 0, 1920, 1920, 'map');

    this.player = new Player(this.game, 100, 110, 'truck');
    this.player.controller = input;

    Buildings.addBuildings(this.game, this.player);

    let squirter = new HammerSquirter(this.game, this.player);
    this.player.equipSquirter(squirter);

    this.game.camera.follow(this.player);

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    this.time.advancedTiming = true;

    this.game.input.activePointer.leftButton.onDown.add(() => {
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
      } else {
        this.game.scale.startFullScreen(false);
      }
    });

    this.hud = new Hud(this.game);
  }

  update() {
    var state = this.game.gameState.current;
    for (var drugName in state.playerState.drugs) {
      var drugObj = state.gameState.drugs[drugName];
      const step = 1 / (drugObj.duration * 60);
      if (state.playerState.drugs[drugName] < step) {
        state.playerState.drugs[drugName] = 0;
      } else {
        state.playerState.drugs[drugName] -= step;
        state.playerState.health -=
          drugObj.damage * state.playerState.drugs[drugName];
      }
    }

    if (state.playerState.health < 0) {
      alert("YOUR DEAD");
    }

    this.hud.updateWith(state);
  }

  render() {
    var renderTypes = {};
    renderTypes[Phaser.WEBGL] = "WEBGL";
    renderTypes[Phaser.CANVAS] = "CANVAS";
    renderTypes[Phaser.AUTO] = "AUTO";
    renderTypes[Phaser.HEADLESS] = "HEADLESS";
    this.game.debug.text(
      String(this.game.time.fps) +
        " FPS / " +
        renderTypes[this.game.renderType],
      12,
      12);

    this.game.debug.text(
      this.game.gameState.current.playerState.drugs.skeeze.toString(),
      12,
      24);
  }
}


module.exports = Gameplay;

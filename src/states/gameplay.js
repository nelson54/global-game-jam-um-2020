const Phaser = require('phaser-ce');
const Player = require('../sprites/player');
const Input = require('../input');
const Buildings = require('../buildings/buildings');
const Hud = require('../hud/hud');

class Gameplay extends Phaser.State {
  preload() {
    this.game.load.image('transparent', '/assets/nil.png');
    this.game.load.image('red', '/assets/bars/red.png');
    this.game.load.image('red', '/assets/bars/red.png');

    this.game.load.image('hammer-1', '/assets/sprites/regular_hammer.png');

    this.game.load.image('sparkle-1', '/assets/effects/yellow1.png');
    this.game.load.image('sparkle-2', '/assets/effects/yellow2.png');
    this.game.load.image('sparkle-3', '/assets/effects/yellow3.png');

    this.game.load.image('white-sparkle-1', '/assets/effects/white1.png');
    this.game.load.image('white-sparkle-2', '/assets/effects/white2.png');
    this.game.load.image('white-sparkle-3', '/assets/effects/white3.png');

    this.game.load.image('frans-house', '/assets/buildings/house.png');
    this.game.load.image('frans-house.mask', '/assets/buildings/house.mask.png');
    this.game.load.image('workshop', '/assets/buildings/workshop.png');
    this.game.load.image('workshop.mask', '/assets/buildings/workshop.mask.png');
    this.game.load.image('hardware', '/assets/buildings/hardware.png');
    this.game.load.image('hardware.mask', '/assets/buildings/hardware.mask.png');
    this.game.load.image('doghouse', '/assets/buildings/doghouse.png');
    this.game.load.image('doghouse.mask', '/assets/buildings/doghouse.mask.png');

    this.game.load.image('truck', '/assets/sprites/truck.png');

    this.game.load.image('normal-bullet', '/assets/sprites/normal-bullet.png');
    this.game.load.image('white-ball', 'assets/sprites/white-ball.png');
    this.game.load.image('droplet', 'assets/sprites/droplet.png');
    this.game.load.image('water-balloon', 'assets/sprites/water-balloon.png');


    this.game.load.image('map', 'assets/map.png');
  }

  create() {
    this.game.input.enabled = true;
    let input = new Input.XBoxController(this.input.gamepad.pad1);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.add.tileSprite(0, 0, 1920, 1920, 'map');

   this.game.input.keyboard.onPressCallback = function(pressed) {
      if (pressed === "8") {
        this.game.state.start('menuBuyDrugs');
      }
    };

    Buildings.addBuildings(this.game);

    this.player = new Player(this.game, 100, 110, 'truck');
    this.player.controller = input;

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

    this.game.hud = new Hud(this.game);
  }

  update() {
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
  }
}


module.exports = Gameplay;

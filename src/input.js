var Phaser = require('phaser-ce');

const Buttons = {
  GAS: 1,
  BRAKE: 2,
  REVERSE: 3,
  SQUIRT: 4,
  TAKE_DRUG: 5,
  CHANGE_HAMMER_FORWARD: 6,
  CHANGE_HAMMER_BACKWARD: 7,
  CHANGE_DRUG_FORWARD: 8,
  CHANGE_DRUG_BACKWARD: 9,
  YES: 10,
  NO: 11,
};

class XBoxController {
  constructor(pad) {
    this.active = true;
    this.pad = pad;
  }

  destroy() {
    this.pad.destroy();
  }

  get connected() {
    return this.pad.connected;
  }

  get movement() {
    let xValue = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
    let yValue = this.pad.buttonValue(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
    return {
      x: xValue ? xValue : 0.0,
      y: yValue ? yValue : 0.0,
    };
  }

  isDown(button) {
    switch (button) {
      case Buttons.GAS:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        break;
      case Buttons.BRAKE:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_X);
        break;
      case Buttons.REVERSE:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        break;
      case Buttons.SQUIRT:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        break;
      case Buttons.TAKE_DRUG:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_Y);
        break;
      case Buttons.CHANGE_HAMMER_FORWARD:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP);
        break;
      case Buttons.CHANGE_HAMMER_BACKWARD:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN);
        break;
      case Buttons.CHANGE_DRUG_FORWARD:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
        break;
      case Buttons.CHANGE_DRUG_BACKWARD:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        break;
      case Buttons.YES:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_A);
        break;
      case Buttons.NO:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_B);
        break;
    }

    return false;
  }
}

module.exports = {
  Buttons: Buttons,
  XBoxController: XBoxController,
}

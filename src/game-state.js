const EventTypes = require('./event-types');

class GameState {
  static load() {
    if(!GameState.state) {
      GameState.state = Object.assign({}, initialState);
    }
  }

  static reset() {
    GameState.state = null;
    return load();
  }

  static save(obj) {
    GameState.state.current = obj;
  }

  constructor(obj) {
    this.events = new Phaser.Events.EventEmitter();
    this.current = obj;
  }

  adjustHealth(amount) {
    let currentHealth = this.current.playerState.health,
      newHealth = currentHealth = Math.min(currentHealth + amount, this.current.gameState.player.healthMax);

    this.events.emit({
      type: EventTypes.ChangeHealth,
      amount: amount,
      health: currentHealth
    })
  }

  adjustHammers(type, amount) {
    this.events.emit({
      type: EventTypes.ChangeHammers,
    })
  }

  adjustDoglars(amount) {
    this.events.emit({
      type: EventTypes.ChangeDoglars,
    })
  }

  useDrug(amount) {
    let newValue = this.current.playerState.drugs[this.current.playerState.activeDrug] -= amount;

    this.events.emit({
      type: EventTypes.ChangeDrugs,
      drug: this.current.playerState.activeDrug,
      delta: amount,
      value: newValue

    })
  }

  set activeDrug(type) {
    this.current.playerState.activeDrug = type;

    this.events.emit({
      type: EventTypes.ChangeActiveDrug,
      drug: type
    });
  }

  set activeHammer(type) {
    this.current.playerState.activeHammer = type;
    this.events.emit({
      type: EventTypes.ChangeActiveHammer,
      hammer: type
    });
  }
}

const initialState = {
  playerState: {
    health: 100,
    doglars:50,
    activeDrug: null,
    activeHammer: 'rock',
    drugs: {
      skeeze: 0,
      chlorine_triflouride: 0,
      research: 0,
      canadian_frog: 0
    },
    hammers: {
      rock: 10,
      brick: 0,
      steel: 0,
      gold: 0,
    },
    effects: {

    }
  },
  gameState: {
    player: {
      healthMax: 150
    },
    hammers: {
      rock: {
        name: "rock",
        cost: 10,
        amount: 100,
        repairValue: 1
      },
      brick: {
        name: "brick",
        cost: 0,
        amount: 100,
        repairValue: 5
      },
      steel: {
        name: "steel",
        cost: 0,
        amount: 100,
        repairValue: 100
      },
      gold: {
        name: "gold",
        cost: 0,
        amount: 100,
        repairValue: 1000
      },
    },
  }
};

module.exports = GameState;

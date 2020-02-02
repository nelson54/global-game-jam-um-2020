const EventTypes = require('./event-types');

class GameState {

  static load() {
    if(!GameState.state) {
      GameState.state = new GameState(Object.assign({}, initialState));
    }

    return GameState.state;
  }

  static reset() {
    GameState.state = null;
    return load();
  }

  static save(obj) {
    GameState.state.current = obj;
  }

  constructor(obj) {
    //this.events = new Phaser.Events.EventEmitter();
    this.current = obj;
    this.debug = true;
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
      clf3: 0,
      f73_k12_b: 0,
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
    drugs: {
      skeeze: {
        name: "skeeze",
        display_name: "Skeeze",
        price: 0,
        duration: 0
      },
      clf3: {
        name: "clf3",
        display_name: "Chlorine Triflouride",
        price: 0,
        duration: 0
      },
      research: {
        name: "f73_k12_b",
        display_name: "F73-k12-b",
        price: 0,
        duration: 0
      },
      canadian_frog: {
        name: "canadian_frog",
        display_name: "Canadian Frog",
        price: 0,
        duration: 0
      }
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
        name: "regular",
        cost: 0,
        amount: 100,
        repairValue: 100
      },
      golden: {
        name: "golden",
        cost: 0,
        amount: 100,
        repairValue: 1000
      },
    },
  }
};

module.exports = GameState;

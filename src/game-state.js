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
    this.debug = false;
  }

  /*
  adjustHealth(amount) {
    let currentHealth = this.current.playerState.health,
      newHealth = currentHealth = Math.min(currentHealth + amount, this.current.gameState.player.healthMax);

    this.events.emit({
      type: EventTypes.ChangeHealth,
      amount: amount,
      health: currentHealth
    })
  }
  */

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
    activeDrug: 'skeeze',
    activeHammer: 'rock',
    hammers: {
      rock: 10,
      brick: 0,
      steel: 0,
      golden: 0,
    },
    effects: {

    },
    drugs: {
      skeeze: {
        dosage: 1,
        inventory: 2,
        prev: 'canadian_frog',
        next: 'clf3'
      },
      clf3: {
        dosage: 1,
        inventory: 0,
        prev: 'skeeze',
        next: 'f73_k12_b'
      },
      f73_k12_b: {
        dosage: 0.25,
        inventory: 0,
        prev: 'clf3',
        next: 'canadian_frog'
      },
      canadian_frog: {
        dosage: 0,
        inventory: 0,
        prev: 'f73_k12_b',
        next: 'skeeze'
      }
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
        duration: 30,
        damage: 2e-2,
      },
      clf3: {
        name: "clf3",
        display_name: "Chlorine Triflouride",
        price: 0,
        duration: 30,
        damage: 2e-2,
      },
      f73_k12_b: {
        name: "f73_k12_b",
        display_name: "F73-k12-b",
        price: 0,
        duration: 30,
        damage: 2e-2,
      },
      canadian_frog: {
        name: "canadian_frog",
        display_name: "Canadian Frog",
        price: 0,
        duration: 30,
        damage: 2e-2,
      }
    },
    hammers: {
      rock: {
        name: "rock",
        cost: 10,
        amount: 100,
        repairValue: 1,
        next: 'brick',
        prev: 'golden'
      },
      brick: {
        name: "brick",
        cost: 0,
        amount: 100,
        repairValue: 5,
        next: 'steel',
        prev: 'rock'
      },
      steel: {
        name: "steel",
        cost: 0,
        amount: 100,
        repairValue: 100,
        next: 'golden',
        prev: 'brick'
      },
      golden: {
        name: "golden",
        cost: 0,
        amount: 100,
        repairValue: 1000,
        next: 'rock',
        prev: 'steel'
      },
    },
  }
};

module.exports = GameState;

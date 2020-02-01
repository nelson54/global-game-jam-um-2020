class GameState {

  static load() {
    return {
      health: 100,
      doglars:1000,
      activeDrug: 'skeeze',
      activeHammer: 'rock',
      drugs: {
        skeeze: 0,
        chlorine_triflouride: 0,
        research: 0,
        canadian_frog: 0
      },
      hammers: {
        rock: 0,
        brick: 0,
        steel: 0,
        gold: 0,
      },
      affects: {

      }
    }
  }

  static save() {
    throw 'fit';
  }

}

module.exports = GameState;

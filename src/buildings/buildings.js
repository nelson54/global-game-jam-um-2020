const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse');
module.exports = {
  addBuildings: (game) => {
    game.buildings = {
      FransHouse: new FransHouse(game),
      Workshop: new Workshop(game),
      Hardware: new Hardware(game),
      Doghouse: new Doghouse(game),
    }
  }
}

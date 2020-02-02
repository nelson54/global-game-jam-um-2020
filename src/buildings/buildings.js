const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse'),
  School = require('./school')
module.exports = {
  addBuildings: (game) => {
    game.buildings = {
      FransHouse: new FransHouse(game),
      Workshop: new Workshop(game),
      Hardware: new Hardware(game),
      Doghouse: new Doghouse(game),
      School: new School(game),
    };

    let buildings = Object.values(game.buildings);

    game.physics.p2.enable(buildings, false);

    buildings.forEach((building) => {
      building.addPhysics();
    });


  }
}

const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse'),
  School = require('./school'),
  Dumpster1= require('./dumpster-1'),
  Dumpster2= require('./dumpster-2');

module.exports = {
  addBuildings: (game) => {
    game.buildings = {
      FransHouse: new FransHouse(game),
      Workshop: new Workshop(game),
      Hardware: new Hardware(game),
      Doghouse: new Doghouse(game),
      School: new School(game),
      Dumpster1: new Dumpster1(game),
      Dumpster2: new Dumpster2(game)
    };

    let buildings = Object.values(game.buildings);
    game.buildingsCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.enable(buildings, game.gameState.debug);

    buildings.forEach((building) => {
      building.addPhysics();
    });
  },


  checkBuildings: (game) => {
    let repairedBuildings = Object.values(game.buildings)
      .filter((building) => {
        building.getDamage();
        return building.health >= building.maxHealth
      }).length

    if(repairedBuildings >= 6) {
      console.log("You win");
      game.state.start('win');
    }
  }

};

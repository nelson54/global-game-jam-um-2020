const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse');
module.exports = {
  addBuildings: (game, truck) => {
    game.buildings = {
      FransHouse: new FransHouse(game),
      Workshop: new Workshop(game),
      Hardware: new Hardware(game),
      Doghouse: new Doghouse(game),
    };

    let buildings = Object.values(game.buildings);

    let objs = Object.values(game.buildings).map((building)=>{
      return building
    });

    game.physics.p2.enable(objs, true);

    buildings.forEach((building) => {
      building.body.static = true;
      building.body.clearShapes();
      building.body.loadPolygon('physicsData', building.name);
    });
  }
}

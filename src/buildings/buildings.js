const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse');
module.exports = {
  addBuildings: (game, truck) => {

    //let collisionGroup = game.physics.p2.createCollisionGroup();

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

    objs.push(truck);
    game.physics.p2.enable(objs, true);

    buildings.forEach((building) => {
      building.body.static = true;
      building.body.clearShapes();
      building.body.loadPolygon('physicsData', building.name);
    });
    truck.body.rotateRight(180);
    //truck.addPhysics();

    //game.buildings.collisionGroup = collisionGroup;

    //game.physics.p2.updateBoundsCollisionGroup();
    //truck.body.collides([collisionGroup]);
  }
}

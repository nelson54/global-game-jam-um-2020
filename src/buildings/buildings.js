const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse');
module.exports = {
  addBuildings: (game, truck) => {

    let collisionGroup = game.physics.p2.createCollisionGroup();

    game.buildings = {
      FransHouse: new FransHouse(game, collisionGroup),
      Workshop: new Workshop(game, collisionGroup),
      Hardware: new Hardware(game, collisionGroup),
      Doghouse: new Doghouse(game, collisionGroup),
    };

    game.buildings.collisionGroup = collisionGroup;

    game.physics.p2.updateBoundsCollisionGroup();
    truck.body.collides([collisionGroup]);
  }
}

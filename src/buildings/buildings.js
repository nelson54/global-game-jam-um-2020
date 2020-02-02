const FransHouse = require('./frans-house'),
Workshop = require('./workshop'),
Hardware = require('./hardware'),
Doghouse = require('./doghouse');
module.exports = {
  addBuildings: (game, truck) => {

    let collisionGroup = game.physics.p2.createCollisionGroup();
    var buildingMasks = game.add.group();
    buildingMasks.x = 0;
    buildingMasks.y = 0;
    buildingMasks.enableBody = true;
    buildingMasks.physicsBodyType = Phaser.Physics.P2JS;

    game.buildings = {
      FransHouse: new FransHouse(game, buildingMasks, collisionGroup),
      Workshop: new Workshop(game, buildingMasks, collisionGroup),
      Hardware: new Hardware(game, buildingMasks, collisionGroup),
      Doghouse: new Doghouse(game, buildingMasks, collisionGroup),
    };

    game.buildings.collisionGroup = collisionGroup;

    game.physics.p2.updateBoundsCollisionGroup();
    truck.body.collides([collisionGroup]);
  }
}

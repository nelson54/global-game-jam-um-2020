const Phaser = require('phaser-ce');

let style = {
  "fill": "white",
  "font": "bold 10pt Comic Sans MS",
  "strokeThickness": 8
};

let messages = {
  'BuildingDamage': 'You took damage from a building.',
  'OverDoseDamage': 'You took too much drugs.',
  'WithrawalDamage': 'You need to take more drugs.'
}

class PlayerMessage extends Phaser.Text {
  constructor(game, x, y, message) {
    super(game, x, y, messages[message]);
  }

}

class PlayerMessages extends Phaser.Particles.Arcade.Emitter {
  constructor(game, player) {
    super(game);

    this.player = player;

    this.particleClass = PlayerMessage;
    this.maxParticles = 20;

    this.makeParticles(['BuildingDamage', 'OverDoseDamage', 'WithrawalDamage',], undefined, undefined, undefined, false);
    this.gravity = 0;

    //this.sound = game.boop;

    this.bulletSpeed = 800;

    game.add.existing(this);
  }

  showMessage(message = 'BuildingDamage') {
    this.emitParticle(message);
  }

  update() {
    if (this.player) {
      let vector = {
        x: -Math.cos(this.player.rotation),
        y: -Math.sin(this.player.rotation),
      };

      this.x = this.player.x + this.player.width * 0.8 * vector.x;
      this.y = this.player.y + this.player.width * 0.8 * vector.y;

      //this.maxParticleSpeed = new Phaser.Point(vector.x * this.bulletSpeed, vector.y * this.bulletSpeed);
      //this.minParticleSpeed = this.maxParticleSpeed;

      this.forEachAlive((particle) => particle.update())
    }
  }
}

module.exports = PlayerMessages;

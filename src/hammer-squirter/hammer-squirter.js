const Phaser = require('phaser-ce');
const Hammer = require('./hammer');

class HammerSquirter extends Phaser.Particles.Arcade.Emitter {
  constructor(game, player) {
    super(game);

    this.player = player;

    //this.particleClass = Hammer;
    this.maxParticles = 100;

    this.makeParticles(undefined, undefined, undefined, undefined, true);
    this.gravity = 0;

    //this.sound = game.boop;

    this.bulletSpeed = 800;
    this.cooldown = 200;

    game.add.existing(this);
  }

  use() {
    if (!this._lastFire || Date.now() - this._lastFire >= this.cooldown) {
      this.emitParticle();
      //this.sound.play();
      this._lastFire = Date.now();
    }
  }

  update() {
    if (this.player) {
      let vector = {
        x: -Math.cos(this.player.rotation),
        y: -Math.sin(this.player.rotation),
      };

      this.x = this.player.x + this.player.width * 0.75 * vector.x;
      this.y = this.player.y + this.player.width * 0.75 * vector.y;

      this.maxParticleSpeed = new Phaser.Point(vector.x * this.bulletSpeed, vector.y * this.bulletSpeed);
      this.minParticleSpeed = this.maxParticleSpeed;

      this.forEachAlive((particle) => particle.update())
    }
  }
}

module.exports = HammerSquirter;

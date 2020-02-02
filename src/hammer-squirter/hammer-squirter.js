const Phaser = require('phaser-ce');
const Hammer = require('./hammer');

class HammerSquirter extends Phaser.Particles.Arcade.Emitter {
  constructor(game, player) {
    super(game);

    this.player = player;

    this.particleClass = Hammer;
    this.maxParticles = 100;

    this.makeParticles(['rock', 'brick', 'steel', 'golden',], undefined, undefined, undefined, false);
    this.gravity = 0;

    //this.sound = game.boop;

    this.bulletSpeed = 800;

    game.add.existing(this);
  }

  use() {
    if (!this._lastFire || Date.now() - this._lastFire >= this.cooldown) {
      this.emitParticle(null, null, this.game.gameState.current.playerState.activeHammer); //this.game.gameState.current.playerState.activeHammer
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

      this.x = this.player.x + this.player.width * 0.8 * vector.x;
      this.y = this.player.y + this.player.width * 0.8 * vector.y;

      this.maxParticleSpeed = new Phaser.Point(vector.x * this.bulletSpeed, vector.y * this.bulletSpeed);
      this.minParticleSpeed = this.maxParticleSpeed;

      this.forEachAlive((particle) => particle.update())
    }
  }
}

module.exports = HammerSquirter;

import Phaser from 'phaser'
import GameService from '../services/GameService'
import UIService from '../services/UIService'

let score = 0

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.gameService = new GameService(this, this.gameOver)
    this.UIService = new UIService(this)
    this.emitter = this.add.emitter(this.world.centerX, 200, 200)
    this.emitter.makeParticles('flakes')
    this.emitter.maxParticleScale = 0.8
    this.emitter.minParticleScale = 0.3
    this.emitter.gravity = 1200
    this.emitter.maxParticleSpeed.x = 200
    this.emitter.minParticleSpeed.x = -200
    this.emitter.maxParticleSpeed.y = -200
    this.emitter.minParticleSpeed.y = -600
    this.emitter.minParticleAlpha = 0.2
    this.emitter.maxParticleAlpha = 0.4
  }

  update () {
    this.gameService.update()

    this.game.physics.arcade.overlap(
      this.gameService.player,
      this.gameService.tileService.group,
      this.collisionHandler.bind(this),
      null,
      this
    )
  }

  collisionHandler (a, b) {
    b.kill()
    a.tween()
    this.emitter.x = a.x
    this.emitter.y = a.y - a.height
    this.emitter.start(true, 4000, null, 8)
    score += 100
    this.UIService.updateScore(score)
  }

  render () {
    // this.gameService.render()
  }

  gameOver () {
    // this.game.state.start('GameOver', true, false, { score })
  }
}

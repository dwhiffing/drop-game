import Phaser from 'phaser'
import GameService from '../services/GameService'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.gameService = new GameService(this, this.gameOver)
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
    this.gameService.updateScore(100, a.x, a.y - a.height)
  }

  render () {
    // this.gameService.render()
  }
}

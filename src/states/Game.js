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
  }

  update () {
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
    score++
    this.UIService.scoreText.text = `Score: ${score}`
  }

  gameOver () {
    this.game.state.start('GameOver', true, false, { score })
  }
}

import Phaser from 'phaser'
import GameService from '../services/GameService'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.audio('music', 'assets/images/music.mp3')
    this.load.audio('swipe', 'assets/images/swipe.mp3')
  }

  create () {
    this.stage.backgroundColor = '#1E2F67'
    this.gameService = new GameService(this, this.gameOver)
    this.sound = this.add.audio('swipe')
    this.music = this.add.audio('music')
    this.music.play()
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
    this.sound.play()
    this.gameService.updateScore(25, a.x, a.y - a.height)
  }

  render () {
    // this.gameService.render()
  }
}

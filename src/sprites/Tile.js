import Phaser from 'phaser'

const NUM_FRAMES = 5

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, gameOverCallback }) {
    super(game, x, y, 'tile')
    this.game.physics.arcade.enable(this)
    this.gameOverCallback = gameOverCallback
    this.anchor.setTo(0.5)
    this.kill()
  }

  reset (lane) {
    let x = 110
    if (lane === 1) {
      x = 210
    }
    if (lane === 2) {
      x = 310
    }

    super.reset(x, -200)
    this.visible = true
    this.frame = this._getRandomType()
  }

  update () {
    if (this.visible) {
      this.y += 5
    }

    if (this.y > this.game.height) {
      this.gameOverCallback()
      this.kill()
    }
  }

  _getRandomType () {
    return Math.floor(Math.random() * NUM_FRAMES)
  }
}

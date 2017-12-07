import Phaser from 'phaser'

const NUM_FRAMES = 3

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, gameOverCallback }) {
    super(game, x, y, 'tile')
    this.game.physics.arcade.enable(this)
    this.gameOverCallback = gameOverCallback
    this.anchor.setTo(0.5)
    this.scale.set(0.5)
    this.kill()
    const mid = this.game.width / 2
    this.lanes = [mid - 100, mid, mid + 100]

    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(150, 120, 50, 60)
  }

  reset (lane) {
    const x = this.lanes[lane]
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
    return Math.floor(Math.random() * NUM_FRAMES + 1)
  }
}

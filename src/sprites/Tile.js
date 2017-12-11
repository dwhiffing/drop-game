import Phaser from 'phaser'

const NUM_FRAMES = 3
const SPEED = 18

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'tile')
    this.game.physics.arcade.enable(this)
    this.anchor.setTo(0.5)
    this.scale.set(window.scaleRatio)
    this.kill()
    let width = this.game.width
    if (width > 500) {
      width = 500
    }
    let mid = this.game.width / 2
    this.lanes = [mid - width / 2.2, mid, mid + width / 2.2]

    game.physics.enable(this, Phaser.Physics.ARCADE)
    const _x = this.width / 2
    this.body.setSize(_x / 3, _x / 5, _x * 1.5, _x)
  }

  reset (lane, speed) {
    const x = this.lanes[lane]
    super.reset(x, -200)
    this.visible = true
    this.speed = speed * SPEED
    this.frame = this._getRandomType()
  }

  update () {
    if (this.visible) {
      this.y += this.speed * window.scaleRatio
    }

    if (this.y > this.game.height + this.height) {
      this.kill()
    }
  }

  _getRandomType () {
    return Math.floor(Math.random() * NUM_FRAMES + 1)
  }
}

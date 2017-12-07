import Phaser from 'phaser'

const NUM_FRAMES = 3
const SPEED = 15

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'tile')
    this.game.physics.arcade.enable(this)
    this.anchor.setTo(0.5)
    this.scale.set(window.scaleRatio)
    this.kill()
    const mid = this.game.width / 2
    this.lanes = [0 + mid / 2.5, mid, this.game.width - mid / 2.5]

    game.physics.enable(this, Phaser.Physics.ARCADE)
    const _x = this.width / 2
    this.body.setSize(_x / 3, _x / 10, _x / 2, _x)
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
      this.y += this.speed
    }

    if (this.y > this.game.height + this.height) {
      this.kill()
    }
  }

  _getRandomType () {
    return Math.floor(Math.random() * NUM_FRAMES + 1)
  }
}

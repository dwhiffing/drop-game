import Phaser from 'phaser'

const MOVE_DIST = 100
const ANIMATION_DURATION = 250

export default class extends Phaser.Sprite {
  constructor ({ game }) {
    super(game, game.width / 2, game.height - 150, 'tile')
    this.group = game.add.group()
    this.game.physics.arcade.enable(this)
    this.group.add(this)
    this.reset(this.x, this.y)
    this.frame = 1
    this.scale.setTo(1.5)
    this.anchor.setTo(0.5)
  }

  reset (x, y) {
    this.position = { x, y }
  }

  move (dir, callback) {
    let x = this.x

    if (dir === 1) {
      if (x > this.game.width - 200) {
        return
      }
      x += MOVE_DIST
    } else {
      if (x < 200) {
        return
      }
      x -= MOVE_DIST
    }

    const tween = this.game.add
      .tween(this)
      .to({ x }, ANIMATION_DURATION, Phaser.Easing.Linear.None, true)
    callback && tween.onComplete.add(callback, this)

    return tween
  }
}

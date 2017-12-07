import Phaser from 'phaser'

export default class {
  constructor ({ game }) {
    this.text = game.add.text(0, 0, 'text')
    this.text.anchor.setTo(0.5)
  }

  reset (x, y) {
    this.position = { x, y }
    this.alpha = 1
    this.tween()
  }

  tween () {
    this.game.add
      .tween(this)
      .to({ y: this.y - 200, alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true)
  }
}

import Phaser from 'phaser'

export default class {
  constructor ({ game }) {
    const style = {
      font: `${60 * window.scaleRatio}pt Roboto`,
      fill: '#fff',
      weight: 'bold',
      align: 'center'
    }
    this.text = game.add.text(0, 0, '0', style)
    this.text.anchor.setTo(0.5)
    this.text.kill()
    this.text.originalReset = this.text.reset
    this.text.reset = this.reset
    this.text.tween = this.tween
    this.game = game
  }

  reset (x, y, n) {
    this.originalReset(x, y)
    this.alpha = 1
    this.text = n
    this.tween()
  }

  tween () {
    const tween = this.game.add
      .tween(this)
      .to(
        { y: this.y - 200, alpha: 0.8 },
        500,
        Phaser.Easing.Quadratic.Out,
        true
      )
    tween.onComplete.add(() => {
      const tween = this.game.add
        .tween(this)
        .to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.Out, true)
      tween.onComplete.add(this.kill.bind(this))
    })
  }
}

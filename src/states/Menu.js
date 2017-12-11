import Phaser from 'phaser'

export default class extends Phaser.State {
  init (args = {}) {
    this.score = args.score
  }

  preload () {}

  create (args) {
    this.stage.backgroundColor = '#ffffff'
    const image = this.game.add.image(
      this.game.width / 2,
      this.game.height / 2,
      'menu'
    )
    const scale = this.game.width / image.width
    const scaleY = this.game.height / image.height
    image.anchor.set(0.5)
    image.scale.set(scale > scaleY ? scaleY : scale)
    this.game.input.onDown.add(() => {
      this.state.start('Game')
    }, this)
  }
}

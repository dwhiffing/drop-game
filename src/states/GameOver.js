import Phaser from 'phaser'

export default class extends Phaser.State {
  init (args = {}) {
    this.score = args.score
  }

  preload () {
    this.load.image('background', './assets/images/bg.png')
  }

  create (args) {
    this.stage.backgroundColor = '#2bd47f'
    const image = this.game.add.image(
      this.game.width / 2,
      this.game.height / 2,
      'background'
    )
    const scale = this.game.width / image.width
    const scaleY = this.game.height / image.height
    image.anchor.set(0.5)
    image.scale.set(scale > scaleY ? scaleY : scale)
    this.game.input.onDown.add(() => {
      window.location = 'https://b.ewd.io/agtq/FERNNNZyGI'
    }, this)
  }
}

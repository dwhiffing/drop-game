import Phaser from 'phaser'

export default class extends Phaser.State {
  init (args = {}) {
    this.score = args.score
  }

  preload () {}

  create (args) {
    this.stage.backgroundColor = '#ffffff'
    const image = this.game.add.image(0, 0, 'background')
    const scale = this.game.width / image.width
    image.scale.set(scale)
    this.game.input.onDown.add(() => {
      window.location = 'https://b.ewd.io/agtq/FERNNNZyGI'
    }, this)
  }
}

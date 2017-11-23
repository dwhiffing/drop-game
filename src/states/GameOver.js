import Phaser from 'phaser'

export default class extends Phaser.State {
  init (args = {}) {
    this.score = args.score
  }
  preload () {}

  create (args) {
    const bannerText = 'Game Over!'
    const banner = this.game.add.text(
      this.state.game.width / 2,
      this.state.game.height / 2,
      bannerText
    )
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    const scoreText = this.game.add.text(
      this.state.game.width / 2,
      this.state.game.height / 2 + 100,
      `Score: ${this.score}`
    )
    scoreText.font = 'Bangers'
    scoreText.padding.set(10, 16)
    scoreText.fontSize = 32
    scoreText.fill = '#fff'
    scoreText.smoothed = false
    scoreText.anchor.setTo(0.5)
  }
}

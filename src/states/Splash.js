import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBar'
    )
    this.loaderBg.anchor.setTo(0.5)
    this.loaderBar.anchor.setTo(0.5)

    this.load.setPreloadSprite(this.loaderBar)
    this.load.spritesheet('tile', 'assets/images/sprites.png', 250, 250)
    this.load.spritesheet('flakes', 'assets/images/flakes.png', 80, 80)
  }

  create () {
    this.state.start('Game')
  }
}

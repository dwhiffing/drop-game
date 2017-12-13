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
    this.loaderBg.scale.setTo(window.scaleRatio)
    this.loaderBar.anchor.setTo(0.5)
    this.loaderBar.scale.setTo(window.scaleRatio)

    this.load.setPreloadSprite(this.loaderBar)
    this.load.image('menu', './assets/images/menu.png')
  }

  update () {
    this.state.start('Menu')
  }
}

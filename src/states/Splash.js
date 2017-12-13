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
    this.load.spritesheet('tile', 'assets/images/sprites.png', 600, 600)
    this.load.spritesheet('flakes', 'assets/images/flakes.png', 320, 320)
    this.load.audio('music', 'assets/images/music.mp3')
    this.load.audio('swipe', 'assets/images/swipe.mp3')
  }

  update () {
    if (this.cache.isSoundDecoded('music')) {
      this.state.start('Menu')
    }
  }
}

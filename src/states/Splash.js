import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
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

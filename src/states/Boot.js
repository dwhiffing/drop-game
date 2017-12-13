import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#2bd47f'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.refresh()
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Roboto']
      },
      active: this.fontsLoaded
    })
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    this.state.start('Splash')
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}

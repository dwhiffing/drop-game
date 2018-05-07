import Phaser from 'phaser'

function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

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
      const branch = getParameterByName('branch') || 'FERNNNZyGI'
      window.location = `https://b.ewd.io/${branch}`
    }, this)
  }
}

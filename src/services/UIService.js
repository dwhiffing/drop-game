export default class UIService {
  constructor (state) {
    this.group = state.add.group()
    this.graphics = state.add.graphics()
    this.graphics.beginFill('0x000000')
    this.graphics.alpha = 0.5
    const width = 400 * window.scaleRatio
    const height = 140 * window.scaleRatio

    this.graphics.drawRoundedRect(0, 0, width, height, 80)
    this.group.add(this.graphics)

    this.bar = state.add.graphics()
    this.bar.beginFill('0x2bd47f')
    this.bar.alpha = 1
    this.bar.drawRect(0, 0, state.game.width, 50)

    const style = {
      font: `${60 * window.scaleRatio}pt Roboto`,
      fill: '#fff',
      weight: 'bold',
      align: 'center',
      boundsAlignH: 'center',
      boundsAlignV: 'center'
    }

    this.scoreText = state.add.text(0, width / 15, '0', style)
    this.scoreText.setTextBounds(0, 0, width, height)
    this.scoreText.resolution = window.devicePixelRatio
    this.group.add(this.scoreText)

    this.group.x = state.world.centerX - this.graphics.width / 2
    this.group.y = 100
  }

  updateScore (n) {
    this.scoreText.text = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

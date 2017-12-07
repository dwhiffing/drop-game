export default class UIService {
  constructor (state) {
    this.group = state.add.group()
    this.graphics = state.add.graphics()
    this.graphics.beginFill('0x000000')
    this.graphics.alpha = 0.5
    const width = 350 * window.scaleRatio
    const height = 120 * window.scaleRatio

    this.graphics.drawRoundedRect(0, 0, width, height, 50)
    this.group.add(this.graphics)

    const style = {
      font: `${50 * window.scaleRatio}pt Roboto`,
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
    this.group.y = 50
  }

  updateScore (n) {
    this.scoreText.text = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

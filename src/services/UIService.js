export default class UIService {
  constructor (state) {
    this.group = state.add.group()
    this.graphics = state.add.graphics()
    this.graphics.beginFill('0x000000')
    this.graphics.alpha = 0.5

    this.graphics.drawRoundedRect(0, 0, 120, 40, 50)
    this.group.add(this.graphics)

    const style = {
      font: '24px Sailec',
      fill: '#fff',
      weight: 'bold',
      align: 'center',
      boundsAlignH: 'center',
      boundsAlignV: 'center'
    }

    this.scoreText = state.add.text(0, 6, '0', style)
    this.scoreText.setTextBounds(0, 0, 120, 50)
    this.scoreText.resolution = window.devicePixelRatio
    this.group.add(this.scoreText)

    this.group.x = state.world.centerX - 60
    this.group.y = 20
  }

  updateScore (n) {
    this.scoreText.text = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

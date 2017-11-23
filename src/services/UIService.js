export default class UIService {
  constructor (state) {
    const x = state.game.height
    const graphics = state.game.add.graphics(0, 0)
    graphics.beginFill(0x222222)
    graphics.lineTo(x, 0)
    graphics.lineTo(x, 80)
    graphics.lineTo(0, 80)
    graphics.lineTo(0, 0)
    graphics.endFill()

    const y = state.game.height

    graphics.moveTo(0, y - 80)
    graphics.beginFill(0x222222)
    graphics.lineTo(x, y - 80)
    graphics.lineTo(x, y)
    graphics.lineTo(0, y)
    graphics.lineTo(0, y - 80)
    graphics.endFill()

    const bannerText = 'Drop'
    const banner = state.add.text(state.world.centerX, 40, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.scoreText = state.add.text(
      state.world.centerX,
      state.game.height - 35,
      'Score: 0'
    )
    this.scoreText.font = 'Bangers'
    this.scoreText.padding.set(10, 16)
    this.scoreText.fontSize = 30
    this.scoreText.fill = '#fff'
    this.scoreText.smoothed = false
    this.scoreText.anchor.setTo(0.5)
  }
}

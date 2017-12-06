export default class UIService {
  constructor (state) {
    this.scoreText = state.add.text(state.world.centerX, 50, 'Score: 0')
    this.scoreText.font = 'Bangers'
    this.scoreText.padding.set(10, 16)
    this.scoreText.fontSize = 30
    this.scoreText.fill = '#fff'
    this.scoreText.smoothed = false
    this.scoreText.anchor.setTo(0.5)
  }
}

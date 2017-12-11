import PointText from '../sprites/PointText'

export default class UIService {
  constructor ({ game }) {
    this.score = 0

    this.game = game

    this.group = game.add.group()
    this.graphics = game.add.graphics()
    this.graphics.beginFill('0x000000')
    this.graphics.alpha = 0.5
    const width = 400 * window.scaleRatio
    const height = 140 * window.scaleRatio
    this.timer = this.game.time.events.loop(20000, this.endGame, this)

    this.graphics.drawRoundedRect(0, 0, width, height, height / 2)
    this.group.add(this.graphics)

    this.bar = game.add.graphics()
    this.bar.beginFill('0x2bd47f')
    this.bar.alpha = 1
    this.bar.drawRect(0, 0, game.width, 30)

    const style = {
      font: `${60 * window.scaleRatio}pt Roboto`,
      fill: '#fff',
      weight: 'bold',
      align: 'center',
      boundsAlignH: 'center',
      boundsAlignV: 'center'
    }

    this.scoreText = game.add.text(0, width / 15, '0', style)
    this.scoreText.setTextBounds(0, 0, width, height)
    this.scoreText.resolution = window.devicePixelRatio
    this.group.add(this.scoreText)

    this.group.x = game.world.centerX - this.graphics.width / 2
    this.group.y = 100

    this.pointTexts = game.add.group()
    for (let i = 0; i < 10; i++) {
      const pointText = new PointText({ game: game })
      this.pointTexts.add(pointText.text)
    }
  }

  updateScore (n, x, y) {
    this.score += n
    const pointText = this.pointTexts.getFirstDead()
    if (pointText) {
      pointText.reset(x, y, n)
    }
    this.scoreText.text = this.score
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  update () {
    this.bar.scale.x =
      (this.timer.tick - this.timer.timer._now) / this.timer.delay
  }

  endGame () {
    this.game.state.start('GameOver', true, false, {
      score: this.score
    })
  }
}

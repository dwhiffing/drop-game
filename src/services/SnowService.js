const MAX_FLAKES = 20
const MAX_SNOW = 200

export default class SnowService {
  constructor (state, gameOverCallback) {
    this.game = window.game

    this.snow = []
    for (let i = 0; i < MAX_SNOW; i++) {
      const graphic = this.game.add.graphics(0, 0)

      graphic.beginFill(0xffffff, 1)
      graphic.drawCircle(0, 0, 8)
      this.snow.push(graphic)
      this.updateSnow(
        i,
        Math.random() * this.game.width,
        Math.random() * this.game.height
      )
    }

    this.flakes = []
    for (let i = 0; i < MAX_FLAKES; i++) {
      const flake = this.game.add.sprite(0, 0, 'flakes')
      flake.anchor.set(0.5)
      this.flakes.push(flake)
      this.updateFlake(
        i,
        Math.random() * this.game.width,
        Math.random() * this.game.height
      )
    }
    this.angle = 0
    this.snowAngle = 0
  }

  update () {
    this.angle += 0.001
    this.snowAngle += 0.01

    const W = this.game.width
    const H = this.game.height

    for (let i = 0; i < MAX_FLAKES; i++) {
      let p = this.flakes[i]
      p.y += Math.cos(this.angle + p.d) + 1 + p.r / 2
      p.x += Math.sin(this.angle) * 2
      p.angle += p.angleDelta

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          this.updateFlake(i, Math.random() * W, -10)
        } else {
          if (Math.sin(this.angle) > 0) {
            this.updateFlake(i, -5, Math.random() * H)
          } else {
            this.updateFlake(i, W + 5, Math.random() * H)
          }
        }
      }
    }

    for (let i = 0; i < MAX_SNOW; i++) {
      let p = this.snow[i]
      p.y += Math.cos(this.angle + p.d) + 1 + p.r / 2
      p.x += Math.sin(this.angle) * 2

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          this.updateSnow(i, Math.random() * W, -10)
        } else {
          if (Math.sin(this.angle) > 0) {
            this.updateSnow(i, -5, Math.random() * H)
          } else {
            this.updateSnow(i, W + 5, Math.random() * H)
          }
        }
      }
    }
  }

  updateFlake (i, x, y) {
    this.flakes[i].x = x
    this.flakes[i].y = y
    this.flakes[i].scale.set(Math.random() * 0.3 + 0.5)
    this.flakes[i].angleDelta = Math.random() * 1 + -0.5
    this.flakes[i].frame = Math.floor(Math.random() * 9)
    this.flakes[i].r = (Math.random() * 4 + 1) / 2
    this.flakes[i].alpha = 30 * this.flakes[i].r / 100
    this.flakes[i].d = Math.random() * MAX_FLAKES
  }

  updateSnow (i, x, y) {
    this.snow[i].x = x
    this.snow[i].y = y
    this.snow[i].r = Math.random() * 4 + 1
    this.snow[i].d = Math.random() * MAX_SNOW
    this.snow[i].scale.set(Math.random() * 0.7 + 0.2)
    this.snow[i].alpha = 40 * this.snow[i].r / 100
  }
}

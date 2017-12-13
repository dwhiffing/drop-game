const MAX_FLAKES = 5
const MAX_SNOW = 20
const BASE_Y_SPEED = 5
const FLAKE_BUFFER = 320 / 2
const SNOW_BUFFER = 5
const NUM_SNOW_SCALES = 4
const NUM_FLAKE_SCALES = 4

export default class SnowService {
  constructor (state) {
    this.game = window.game

    this.snow = []
    for (let i = 0; i < MAX_SNOW * window.devicePixelRatio; i++) {
      const graphic = this.game.add.graphics(0, 0)

      graphic.beginFill(0xffffff, 1)
      graphic.drawCircle(0, 0, 15)
      this.snow.push(graphic)
      this.updateSnow(
        i,
        Math.random() * this.game.width,
        Math.random() * this.game.height
      )
    }

    this.flakes = []
    for (let i = 0; i < MAX_FLAKES * window.devicePixelRatio; i++) {
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

    for (let i = 0; i < MAX_FLAKES * window.devicePixelRatio; i++) {
      let p = this.flakes[i]
      const buffer = FLAKE_BUFFER * window.scaleRatio
      p.y += Math.cos(this.angle + p.d) + BASE_Y_SPEED + p.r
      p.x += Math.sin(this.angle) * 2
      p.angle += p.angleDelta

      if (p.x > W + buffer || p.x < -buffer || p.y > H + buffer) {
        if (i % 3 > 0) {
          this.updateFlake(i, Math.random() * W, -buffer)
        } else {
          if (Math.sin(this.angle) > 0) {
            this.updateFlake(i, -buffer, Math.random() * H)
          } else {
            this.updateFlake(i, W + buffer, Math.random() * H)
          }
        }
      }
    }

    for (let i = 0; i < MAX_SNOW * window.devicePixelRatio; i++) {
      let p = this.snow[i]
      const buffer = SNOW_BUFFER * window.scaleRatio
      p.y += Math.cos(this.angle + p.d) + BASE_Y_SPEED + p.r / 2
      p.x += Math.sin(this.angle) * 2

      if (p.x > W + buffer || p.x < -buffer || p.y > H + buffer) {
        if (i % 3 > 0) {
          this.updateSnow(i, Math.random() * W, -buffer)
        } else {
          if (Math.sin(this.angle) > 0) {
            this.updateSnow(i, -buffer, Math.random() * H)
          } else {
            this.updateSnow(i, W + buffer, Math.random() * H)
          }
        }
      }
    }
  }

  updateFlake (i, x, y) {
    const flake = this.flakes[i]
    flake.x = x
    flake.y = y
    flake.r = Math.random() * NUM_FLAKE_SCALES + 1
    flake.d = Math.random() * MAX_FLAKES

    flake.alpha = 10 * flake.r / 100
    flake.scale.set(flake.r / NUM_FLAKE_SCALES * 0.7)
    flake.frame = Math.floor(Math.random() * 9)

    flake.angleDelta = Math.random() * 2 + -1
  }

  updateSnow (i, x, y) {
    const snow = this.snow[i]
    snow.x = x
    snow.y = y
    snow.r = Math.random() * NUM_SNOW_SCALES + 1
    snow.d = Math.random() * MAX_SNOW

    snow.alpha = 10 * snow.r / 100
    snow.scale.set(snow.r / NUM_SNOW_SCALES)
  }
}

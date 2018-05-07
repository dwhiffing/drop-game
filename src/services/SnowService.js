const MAX_FLAKES = 10
const BASE_Y_SPEED = 5
const FLAKE_BUFFER = 320 / 2
const NUM_FLAKE_SCALES = 4

export default class SnowService {
  constructor (state) {
    this.game = window.game

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
  }

  update () {
    this.angle += 0.001

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
}

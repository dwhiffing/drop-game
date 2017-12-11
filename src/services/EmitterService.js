export default class EmiterService {
  constructor ({ game }) {
    this.emitter = game.add.emitter(0, 200, 200)
    this.emitter.makeParticles('flakes')
    this.emitter.maxParticleScale = 0.8
    this.emitter.minParticleScale = 0.3
    this.emitter.gravity = 1200
    this.emitter.maxParticleSpeed.x = 200
    this.emitter.minParticleSpeed.x = -200
    this.emitter.maxParticleSpeed.y = -200
    this.emitter.minParticleSpeed.y = -600
    this.emitter.minParticleAlpha = 0.2
    this.emitter.maxParticleAlpha = 0.4
  }

  emit (x, y, amount = 2) {
    this.emitter.x = x
    this.emitter.y = y
    this.emitter.start(true, 4000, null, amount)
  }
}

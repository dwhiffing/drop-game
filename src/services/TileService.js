import Tile from '../sprites/Tile'

export default class TileService {
  constructor () {
    this.game = window.game
    this.tiles = []
    this.group = this.game.add.group()
    this.speeds = [1, 1, 1, 1.5, 1.5, 1.5, 2, 1, 2, 1, 1, 1, 2, 1.5, 1.5, 1, 2]
    this.lane = 1
    this.speedIndex = 0

    for (let i = 0; i < 50; i++) {
      const tile = new Tile({ game: this.game })
      this.tiles.push(tile)
      this.group.add(tile)
    }

    this.game.time.events.loop(1000, this.spawn, this)
  }

  spawn () {
    const tile = this.group.getFirstDead()
    if (tile) {
      tile.angle = this.game.rnd.integerInRange(-8, 8)
      if (!tile) {
        return
      }
      tile.reset(this.lane, this.speeds[this.speedIndex++])

      if (this.speedIndex > this.speeds.length - 1) {
        this.speedIndex = 0
      }
      if (this.lane === 1) {
        this.lane = Math.round(Math.random()) === 1 ? 0 : 2
      } else {
        this.lane = 1
      }
    }
  }
}

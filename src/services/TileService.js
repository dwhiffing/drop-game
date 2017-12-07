import Tile from '../sprites/Tile'

export default class TileService {
  constructor ({ gameOverCallback }) {
    this.game = window.game
    this.tiles = []
    this.group = this.game.add.group()

    for (let i = 0; i < 50; i++) {
      const tile = new Tile({ game: this.game, gameOverCallback })
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
      tile.reset(this.getRandomLane())
    }
  }

  getRandomLane () {
    return Math.floor(Math.random() * 3)
  }
}

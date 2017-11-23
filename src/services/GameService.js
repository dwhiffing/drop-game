import TileService from './TileService'
import Player from '../sprites/Player'

export default class GameService {
  constructor (state, gameOverCallback) {
    this.game = window.game

    this.enableMove = this.enableMove.bind(this)
    this.tileService = new TileService({
      game: this.game,
      gameOverCallback: gameOverCallback
    })

    this.player = new Player({ game: this.game })
    this.game.input.onDown.add(this.onPress, this)
  }

  onPress ({ position }) {
    this.startX = position.x
    this.game.input.onDown.remove(this.onPress, this)
    this.game.input.onUp.add(this.onRelease, this)
    this.game.input.addMoveCallback(this.onMove, this)
  }

  onMove ({ position }) {}

  onRelease ({ position }) {
    this.endX = position.x
    const diff = this.endX - this.startX

    if (diff > 50) {
      this.player.move(1, this.enableMove)
    }

    if (diff < -50) {
      this.player.move(-1, this.enableMove)
    }
    this.game.input.onDown.add(this.onPress, this)
    this.game.input.onUp.remove(this.onRelease, this)
    this.game.input.deleteMoveCallback(this.onMove, this)
  }

  enableMove () {
    if (!this.game.input.onDown.has(this.onPress, this)) {
      this.game.input.onDown.add(this.onPress, this)
    }
  }
}

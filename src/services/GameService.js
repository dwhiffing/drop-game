import TileService from './TileService'
import Player from '../sprites/Player'

export default class GameService {
  constructor (state, gameOverCallback) {
    this.game = window.game

    this.tileService = new TileService({
      game: this.game,
      gameOverCallback: gameOverCallback
    })

    this.player = new Player({ game: this.game })
    this.game.input.onDown.add(this.onPress, this)
  }

  onPress ({ position }) {
    this.startX = position.x
    this.didMove = false
    this.game.input.onDown.remove(this.onPress, this)
    this.game.input.onUp.add(this.onRelease, this)
    this.game.input.addMoveCallback(this.onMove, this)
  }

  onMove ({ position }) {
    this.didMove = true
    this.player.move(position.x)
  }

  onRelease ({ position }) {
    if (this.didMove) {
      this.player.release(this.startX - position.x)
    } else {
      this.player.moveToNearestLane(position.x)
    }
    this.game.input.onDown.add(this.onPress, this)
    this.game.input.onUp.remove(this.onRelease, this)
    this.game.input.deleteMoveCallback(this.onMove, this)
  }

  update () {
    this.player.update()
  }
}

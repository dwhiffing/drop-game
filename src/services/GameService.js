import TileService from './TileService'
import SnowService from './SnowService'
import EmitterService from './EmitterService'
import UIService from './UIService'
import Player from '../sprites/Player'

export default class GameService {
  constructor (state) {
    this.game = window.game

    this.snowService = new SnowService()

    this.tileService = new TileService({ game: this.game })
    this.player = new Player({ game: this.game })
    this.UIService = new UIService({ game: this.game })
    this.EmitterService = new EmitterService({ game: this.game })

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
    this.game.input.onDown.add(this.onPress, this)
    this.game.input.onUp.remove(this.onRelease, this)
    this.game.input.deleteMoveCallback(this.onMove, this)
  }

  update () {
    this.player.update()
    this.snowService.update()
    this.UIService.update()
  }

  updateScore (score, x, y) {
    this.EmitterService.emit(x, y)
    this.UIService.updateScore(score, x, y)
  }

  render () {
    this.game.debug.body(this.player)
    this.tileService.group.forEachAlive(
      this.game.debug.body,
      this.game.debug,
      '#ff9090',
      false
    )
  }
}

import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import GameOverState from './states/GameOver'

class Game extends Phaser.Game {
  constructor () {
    const width = window.innerWidth * window.devicePixelRatio
    const height = window.innerHeight * window.devicePixelRatio
    window.scaleRatio = window.devicePixelRatio / 3

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOverState, false)
  }
}

window.game = new Game()
window.game.state.start('Boot')

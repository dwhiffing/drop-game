import Phaser from 'phaser'

const SPEED = 2
const BUFFER = 80

export default class extends Phaser.Sprite {
  constructor ({ game }) {
    super(game, game.width / 2, game.height - 80, 'tile')
    this.group = game.add.group()
    this.game.physics.arcade.enable(this)
    this.group.add(this)
    this.reset(this.x, this.y)
    this.frame = 0
    this.scale.setTo(0.5)
    this.anchor.setTo(0.5)
    this.lane = 1
    const x = this.game.width / 2
    this.lanes = [x - 100, x, x + 100]
  }

  reset (x, y) {
    this.position = { x, y }
  }

  move (x) {
    this.targetX = x
    if (this.targetX < BUFFER) {
      this.targetX = BUFFER
    } else if (this.targetX > this.game.width - BUFFER) {
      this.targetX = this.game.width - BUFFER
    }
  }

  release (diff) {
    if (Math.abs(diff) > 1) {
      if (diff < 0 && this.lane < 2) {
        this.lane += 1
      } else if (this.lane > 0) {
        this.lane -= 1
      }
      this.targetX = this.lanes[this.lane]
      console.log(diff, this.lane)
    } else {
      this.moveToNearestLane()
    }
  }

  getNearestLane (x = this.x) {
    const diffs = this.lanes.map(lane => Math.abs(lane - x))
    const smallest = Math.min.apply(this, diffs)
    const index = diffs.indexOf(smallest)
    return index
  }

  moveToNearestLane (x = this.x) {
    const index = this.getNearestLane()
    this.targetX = this.lanes[index]
    this.lane = index
  }

  update () {
    if (typeof this.targetX === 'number') {
      this.lane = this.getNearestLane()
      this.x += this.x > this.targetX ? -SPEED : SPEED
    }
  }
}

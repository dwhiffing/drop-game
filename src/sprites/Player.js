import Phaser from 'phaser'

const SPEED = 6

export default class extends Phaser.Sprite {
  constructor ({ game }) {
    super(game, game.width / 2, game.height - 120, 'tile')
    this.group = game.add.group()
    this.game.physics.arcade.enable(this)
    this.group.add(this)
    this.reset(this.x, this.y)
    this.frame = 0

    this.scaleRatio = window.scaleRatio

    this.scale.setTo(this.scaleRatio)
    this.anchor.setTo(0.5, 1)
    this.lane = 1
    this.game = game

    const x = this.game.width / 2
    this.lanes = [0 + x / 2, x, this.game.width - x / 2]
    game.physics.enable(this, Phaser.Physics.ARCADE)
    const _x = this.width / 2

    this.body.setSize(_x / 3, 10, _x / 1.15, _x)
  }

  reset (x, y) {
    this.position = { x, y }
  }

  move (x) {
    this.targetX = x
    if (this.targetX < this.lanes[0]) {
      this.targetX = this.lanes[0]
    } else if (this.targetX > this.lanes[2]) {
      this.targetX = this.lanes[2]
    }
  }

  tween () {
    const tween = this.game.add
      .tween(this.scale)
      .to(
        { x: this.scaleRatio * 1.08, y: this.scaleRatio * 1.2 },
        100,
        Phaser.Easing.Quadratic.Out,
        true
      )

    tween.onComplete.add(() => {
      this.game.add
        .tween(this.scale)
        .to(
          { x: this.scaleRatio, y: this.scaleRatio },
          400,
          Phaser.Easing.Quadratic.Out,
          true
        )
    })
  }

  update () {
    if (typeof this.targetX === 'number') {
      this.x += this.x > this.targetX ? -SPEED : SPEED
    }
  }
}

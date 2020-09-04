import { EVENTS } from '../constants'

import { Background } from '../elements/background'
import { Foreground } from '../elements/foreground'
import { Middleground } from '../elements/middleground'

import { Castle } from '../elements/castle'
import { Mill } from '../elements/mill'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

class FourCastleWorld extends BaseWorld {
  static worldName = 'four-castle'

  constructor (properties) {
    super(properties)

    this._windChangeHandle = null
  }

  addScene () {
    this._addBackground()
    this._addSun()
    this._addMiddleground()
    this._addMill()
    this._addCastle()
    this._addForeground()

    this.fireWindChange()
    const self = this
    const delay = 4 * 1000  // TODO: Bind to clock
    this._windChangeHandle = setInterval(self.fireWindChange.bind(self), delay)
  }

  fireWindChange () {
    const dice = this._rollDice()

    const winds = [
      null,
      'still', 'still',
      'medium', 'medium', 'medium',
      'strong'
    ]

    const wind = winds[ dice ]
    const event = new CustomEvent(EVENTS.WIND, { detail: { wind }})
    this._eventNode.dispatchEvent(event)
  }

  _addBackground () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y,
        height: h / 3,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Background(properties)
  }

  _addCastle () {
    const { x, y, h, w } = this._boundingBox
    const controlsHeight = 5 * 2
    const controlsWidth = 5 * 3

    const properties = {
      boundingBox: {
        x: x + controlsWidth,
        y: y + h * 0.4,
        height: h / 4,
        width: x + w * 0.75 - controlsWidth * 2
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Castle(properties)
  }

  _addForeground () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3
    const middlegroundHeight = h / 5
    const offset = y + backgroundHeight + middlegroundHeight
    const remainingHeight = h - offset

    const properties = {
      boundingBox: {
        x,
        y: offset,
        height: remainingHeight,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Foreground(properties)
  }

  _addMiddleground () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3

    const properties = {
      boundingBox: {
        x,
        y: backgroundHeight,
        height: h / 5,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Middleground(properties)
  }

  _addMill () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x: x + w * 0.7,
        y: y + h * 0.3,
        height: h * 0.2,
        width: w * 0.2
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Mill(properties)
  }
  _addSun () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3

    const properties = {
      boundingBox: {
        x,
        y,
        height: backgroundHeight,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Sun(properties)
  }
}

export { FourCastleWorld }

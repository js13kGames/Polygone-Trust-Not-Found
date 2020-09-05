import { EVENTS } from '../constants'

import { Guild } from '../elements/guild'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

class FiveTownWorld extends BaseWorld {
  static worldName = 'five-town'

  constructor (properties) {
    super(properties)
    this.melody = [1,,,,1,1,,,,,1,,,,1,1]
  }

  addScene () {
    this._addBackground()
    this._addSun()
    this._addMiddleground()
    this._addForeground()
    this._addGuild()
  }

  _addBackground () {
  }

  _addForeground () {
  }

  _addGuild () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x: x + w * 0.3,
        y: y + h * 0.2,
        height: h * 0.6,
        width: w * 0.4
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Guild(properties)
  }

  _addMiddleground () {
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

export { FiveTownWorld }

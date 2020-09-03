import { Sun } from '../elements/sun'

import { EVENTS } from '../events'

import { BaseWorld } from './base'

class FiveTownWorld extends BaseWorld {
  static worldName = 'five-town'

  constructor (properties) {
    super(properties)
  }

  addScene () {
    this._addBackground()
    this._addSun()
    this._addMiddleground()
    this._addForeground()
  }

  _addBackground () {
  }

  _addForeground () {
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

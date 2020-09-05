import { EVENTS } from '../constants'

import { FivePortal } from '../elements/5-portal'
import { FourPortal } from '../elements/4-portal'
import { SixPortal } from '../elements/6-portal'
import { ThreePortal } from '../elements/3-portal'

import { BaseWorld } from './base'

class PortalWorld extends BaseWorld {
  static worldName = 'portal'

  constructor (properties) {
    super(properties)
    this._portalLength = 0.3
  }

  _addBackground () {
    this._portalLength = 0.3
    this._addThreePortal()
    this._addFourPortal()
    this._addFivePortal()
    this._addSixPortal()
  }

  _addFivePortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * (1 - this._portalLength),
        y: y + h * (0.5 - this._portalLength / 2),
        height: h * this._portalLength,
        width: w * this._portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new FivePortal(properties)
  }

  _addFourPortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y: y + h * (0.5 - this._portalLength / 2),
        height: h * this._portalLength,
        width: w * this._portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new FourPortal(properties)
  }

  _addSixPortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * (0.5 - this._portalLength / 2),
        y: y + h * (1 - this._portalLength),
        height: h * this._portalLength,
        width: w * this._portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new SixPortal(properties)
  }

  _addThreePortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * (0.5 - this._portalLength / 2),
        y,
        height: h * this._portalLength,
        width: w * this._portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new ThreePortal(properties)
  }

  _getEventMap () {
    return {
      'click': this._handleClick.bind(this)
    }
  }

  _handleClick (eventTarget) {
    // TODO: Don't transition to portal of world, but the left world of it
    const nextWorld = eventTarget.getAttribute('class')
    console.log('Clicked world', eventTarget, nextWorld)
    if (!nextWorld || nextWorld && !nextWorld.includes('-portal')) {
      return
    }
    const event = new CustomEvent(
      EVENTS.WORLD,
      { detail: { nextWorld }}
    )
    this._eventNode.dispatchEvent(event)
  }
}

export { PortalWorld }

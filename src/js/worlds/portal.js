import { EVENTS, WORLDS } from '../constants'

import { FivePortal } from '../elements/5-portal'
import { FourPortal } from '../elements/4-portal'
import { SixPortal } from '../elements/6-portal'
import { ThreePortal } from '../elements/3-portal'

import { BaseWorld } from './base'

/**
 * Connects all portal worlds.
 * @extends BaseWorld
 */
class PortalWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /**
     * Reserved space for each portal.
     * @private
     */
    this.__portalLength = 0.3
  }

  /**
   * Add elements to the background.
   * @protected
   */
  _addBackground () {
    this.__portalLength = 0.3
    this.__addThreePortal()
    this.__addFourPortal()
    this.__addFivePortal()
    this.__addSixPortal()
  }

  /**
   * Register event listeners.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      click: this.__handleClick.bind(this)
    }
  }

  /**
   * Add FivePortal to the scene.
   * @private
   */
  __addFivePortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * (1 - this.__portalLength),
        y: y + h * (0.5 - this.__portalLength / 2),
        height: h * this.__portalLength,
        width: w * this.__portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new FivePortal(properties)
  }

  /**
   * Add FourPortal to the scene.
   * @private
   */
  __addFourPortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y: y + h * (0.5 - this.__portalLength / 2),
        height: h * this.__portalLength,
        width: w * this.__portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new FourPortal(properties)
  }

  /**
   * Add SixPortal to the scene.
   * @private
   */
  __addSixPortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * (0.5 - this.__portalLength / 2),
        y: y + h * (1 - this.__portalLength),
        height: h * this.__portalLength,
        width: w * this.__portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new SixPortal(properties)
  }

  /**
   * Add ThreePortal to the scene.
   * @private
   */
  __addThreePortal () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * (0.5 - this.__portalLength / 2),
        y,
        height: h * this.__portalLength,
        width: w * this.__portalLength
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new ThreePortal(properties)
  }

  /**
   * Handle click events.
   * @private
   * @param {HTMLElement} eventTarget
   */
  __handleClick (eventTarget) {
    const nextWorld = eventTarget.getAttribute('class')
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

/**
 * Unique identifer for this world.
 * @static
 * @readonly
 */
PortalWorld.worldName = WORLDS.PORTAL

export { PortalWorld }

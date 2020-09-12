import { WORLDS } from '../constants'
import { ThreePortal } from '../elements/3-portal'

import { BaseWorld } from './base'

/**
 * World of triangles.
 * @extends BaseWorld
 */
class ThreePortalWorld extends BaseWorld {
  /**
   * Adds the {@see ThreePortal} to the background.
   * @protected
   */
  _addBackground () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y,
        height: h,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new ThreePortal(properties)
  }
}

/**
 * Unique identifier
 * @static
 * @readonly
 */
ThreePortalWorld.worldName = WORLDS.THREE_PORTAL

export { ThreePortalWorld }

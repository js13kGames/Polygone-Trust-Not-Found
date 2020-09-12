import { FivePortal } from '../elements/5-portal'

import { BaseWorld } from './base'

/**
 * This connects FiveTownWorld to the rest.
 * @extends BaseWorld
 */
class FivePortalWorld extends BaseWorld {
  /**
   * Add the portal to the background.
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

    new FivePortal(properties)
  }
}

/**
 * Unique identifier for this world.
 * @static
 * @readonly
 */
FivePortalWorld.worldName = 'five-portal'

export { FivePortalWorld }

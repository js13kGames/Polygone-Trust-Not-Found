import { SixPortal } from '../elements/6-portal'

import { BaseWorld } from './base'

/**
 * This connects SixMountainWorld to the rest.
 * @extends BaseWorld
 */
class SixPortalWorld extends BaseWorld {
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

    new SixPortal(properties)
  }
}

/**
 * Unique identifier for this world.
 * @static
 * @readonly
 */
SixPortalWorld.worldName = 'six-portal'

export { SixPortalWorld }

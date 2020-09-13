import { WORLDS } from '../constants'
import { t } from '../translations'

import { FourPortal } from '../elements/4-portal'

import { BaseWorld } from './base'

/**
 * This is the portal between FourCastleWorld and the rest.
 * @extends BaseWorld
 */
class FourPortalWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_FOUR_PORTAL')
  }

  /**
   * Add the portal to the Background
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

    new FourPortal(properties)
  }
}

/**
 * Unique identifier for this world.
 * @static
 * @readonly
 */
FourPortalWorld.worldName = WORLDS.FOUR_PORTAL

export { FourPortalWorld }

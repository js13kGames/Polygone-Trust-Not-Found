import { WORLDS } from '../constants'
import { t } from '../translations'

import { ThreePortal } from '../elements/3-portal'

import { BaseWorld } from './base'

/**
 * World of triangles.
 * @extends BaseWorld
 */
class ThreePortalWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_THREE_PORTAL')
  }
 
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

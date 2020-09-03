import { ThreePortal } from '../elements/3-portal'

import { BaseWorld } from './base'

class ThreePortalWorld extends BaseWorld {
  static worldName = '3-portal'

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

export { ThreePortalWorld }

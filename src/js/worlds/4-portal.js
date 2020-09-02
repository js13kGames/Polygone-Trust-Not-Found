import { FourPortal } from '../elements/4-portal'

import { BaseWorld } from './base'

class FourPortalWorld extends BaseWorld {
  static worldName = '4-portal'

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

export { FourPortalWorld }

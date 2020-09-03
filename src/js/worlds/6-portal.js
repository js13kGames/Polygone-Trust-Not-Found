import { SixPortal } from '../elements/6-portal'

import { BaseWorld } from './base'

class SixPortalWorld extends BaseWorld {
  static worldName = '6-portal'

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

export { SixPortalWorld }

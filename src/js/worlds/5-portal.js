import { FivePortal } from '../elements/5-portal'

import { BaseWorld } from './base'

class FivePortalWorld extends BaseWorld {
  static worldName = 'five-portal'

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

export { FivePortalWorld }

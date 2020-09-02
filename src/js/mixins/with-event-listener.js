import { WithBoundingBox } from './with-bounding-box'

// TODO: Turn into real mixin
class WithEventListener extends WithBoundingBox {
  constructor (properties) {
    super(properties)
    this._eventNode = properties.eventNode

    Object.keys(this._getEventMap()).forEach((eventName) => {
      this._eventNode.addEventListener(eventName, this, false)
    })
  }

  // Implementation of EventHandler interface
  handleEvent (event) {
    const { detail, isTrusted, target, type } = event
    const callback = this._getEventMap()[ type ]

    if (callback) {
      // Native Events
      if (isTrusted && target) {
        callback(target)
        return
      }

      // Custom Events
      if (!isTrusted && detail) {
        callback(detail)
        return
      }

      // Everything else
      console.warn(`Unknown event type ${type}`)
      callback(event)
      return
    } else {
      console.warn(`No callback for ${event.type}`)
    }
  }

  _getEventMap () {
    // To be overriden by sub-classes
    return {}
  }
}

export { WithEventListener }

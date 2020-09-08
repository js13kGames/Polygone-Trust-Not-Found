import { WithBoundingBox } from './with-bounding-box'

/**
 * @typedef PropertiesWithEventListener
 * @mixin
 * @mixes PropertiesWithBoundingBox
 * @type {{}}
 * @property {HTMLElement} eventNode - The element to dispatch events on.
 */

/**
 * Mixin to add functionality regarding events and listeners.
 * @extends WithBoundingBox
 * @todo Turn into real mixin
 */
class WithEventListener extends WithBoundingBox {
  /**
   * @param {PropertiesWithEventListener}
   */
  constructor (properties) {
    super(properties)
    this._eventNode = properties.eventNode

    Object.keys(this._getEventMap()).forEach((eventName) => {
      this._eventNode.addEventListener(eventName, this, false)
    })
  }

  /**
   * Implementation of EventListener interface
   * @public
   * @param {Event}       event
   * @param {{}}          event.detail    - Present on CustomEvents
   * @param {Boolean}     event.isTrusted - Fired as reaction on user action?
   * @param {HTMLElement} event.target    - On native events the element it was fired on
   * @param {String}      event.type      - String describing event type.
   * @see {@link https://stackoverflow.com/a/16484266}
   */
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

  /**
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    // To be overriden by sub-classes
    return {}
  }
}

export { WithEventListener }

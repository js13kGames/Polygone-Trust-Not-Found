import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * The icon of the portal for the world of quadrangles.
 * @extends WithParent
 */
class FourPortal extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * The hue of this element.
     */
    this._hue = 0
    /**
     * The life of this element.
     */
    this._life = 100
    /**
     * The sympathy of this element.
     */
    this._sympathy = 0
    this._updateView()
  }

  /**
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Adds a new element to the DOM.
   * @protected
   * @parameter {HTMLElement} parent
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox
    const strokeWidth = 0.08 * w
    const points = [
      (x + w * 0.5)         + ',' + (y     + strokeWidth),
      (x + w - strokeWidth) + ',' + (y + h * 0.5),
      (x + w * 0.5)         + ',' + (y + h - strokeWidth),
      (x     + strokeWidth) + ',' + (y + h * 0.5)
    ].join(' ')

    this.element = this._createSvgElement(
      'polygon',
      { points },
      [ 'four-portal' ]
    )

    this.element.style.setProperty('--strokeWidth',  strokeWidth + '', '')
    parent.appendChild(this.element)
  }

  /**
   * Updates the UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    this.element.style.setProperty('--hue', this._hue + '', '')
  }

  /**
   * Updates UI on every tick of the game clock.
   * @private
   * @parameter {{}}     clock
   * @parameter {Number} clock.day
   * @parameter {Number} clock.hour
   * @parameter {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    if (typeof clock.hour === 'undefined') {
      console.warn('Invalid event', clock)
      return
    }
    if (typeof clock.minute === 'undefined') {
      console.warn('Invalid event', clock)
      return
    }

    this._hue = (clock.hour * 60 + clock.minute) / (24 * 60) * 360
    this._updateView()
  }
}

export { FourPortal }

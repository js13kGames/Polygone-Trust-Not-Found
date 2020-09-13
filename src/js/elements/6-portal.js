import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * The icon of the portal for the world of hexagons.
 * @extends WithParent
 */
class SixPortal extends WithParent {
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
      (x + w * 0.3)         + ',' + (y     + strokeWidth),
      (x + w * 0.7)         + ',' + (y     + strokeWidth),
      (x + w - strokeWidth) + ',' + (y + h * 0.5),
      (x + w * 0.7)         + ',' + (y + h - strokeWidth),
      (x + w * 0.3)         + ',' + (y + h - strokeWidth),
      (x     + strokeWidth) + ',' + (y + h * 0.5)
    ].join(' ')

    this.element = this._svg(
      'polygon',
      { points },
      [ 'six-portal' ]
    )
    this._cssVar(this.element, {'--strokeWidth': strokeWidth})
    parent.appendChild(this.element)
  }

  /**
   * Updates the UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    this._cssVar(this.element, {'--hue': this._hue + ''})
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
    this._hue = (clock.hour * 60 + clock.minute) / (24 * 60) * 360
    this._updateView()
  }
}

export { SixPortal }

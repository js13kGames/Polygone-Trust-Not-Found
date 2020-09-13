import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This was the middleground of my first world: FourCastleWorld.
 * @extends WithParent.
 * @todo Rename to something meaningful.
 */
class Middleground extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    this._hue = 140
    this._life = 50
    this._luminance = 30

    this._timeoutHandle = null
    this._updateView()
  }

  /**
   * Updates on game time update.
   * @protected
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Add a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox
    this.element = this._svg(
      'rect',
      {
        x,
        y,
        height: h,
        width: w
      },
      [ 'middleground' ]
    )
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    this._cssVar(
      this.element,
      {
        '--hue': this._hue + '',
        '--luminance': this._luminance + '%',
      }
    )
  }

  /**
   * Update lightness
   * @private
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    // TODO: Extract into mixin
    const isMorning = clock.hour > 5 && clock.hour < 8
    const isEvening = clock.hour > 17 && clock.hour < 20

    const delta = 6 / 60  // change per minute

    if (isEvening) {
      this._luminance -= delta
    }

    if (isMorning) {
      this._luminance += delta
    }

    this._updateView()
  }
}

export { Middleground }

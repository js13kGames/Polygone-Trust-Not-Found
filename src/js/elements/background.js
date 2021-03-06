import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This class was the actual background of my first world: FourCastleWorld.
 * @extends WithParent
 * @todo Rename to FourSky
 */
class Background extends WithParent {
  /**
   * @param {PropertiesWithParent}
   */
  constructor (properties) {
    super(properties)

    /**
     * The hue of this background.
     */
    this._hue = 211
    /**
     * The saturation of this background.
     * It overrides the sympathy functionality.
     */
    this._saturation = 70
    /**
     * The luminance of this background.
     * It is affected by the game clock.
     */
    this._luminance = 50

    /**
     * This holds the return value of setInterval()
     */
    this._timeoutHandle = null
    this._updateView()
  }

  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this._handleGameTimeUpdate.bind(this)
    }
  }

  _handleGameTimeUpdate (clock) {
    // TODO: Extract into mixin for shared code with Sun
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
      [ 'background' ]
    )
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    this._cssVar(this.element, {'--hue': this._hue + ''})
    this._cssVar(this.element, {'--luminance': this._luminance + '%'})
  }
}

export { Background }

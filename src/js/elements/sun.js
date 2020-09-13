import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This is the sun in all worlds.
 * I had the idea to subclass it to change the shape accordingly to the world.
 * @extends WithParent
 * @todo Turn into triangle for ThreeVillageWorld
 * @todo Turn into square for FourCastleWorld
 * @todo Turn into pentagon for FiveTownWorld
 * @todo Turn into hexagon for SixMountainWorld
 */
class Sun extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    this._radius = 3
    this._axisX = this._boundingBox.x
    this._axisY = this._boundingBox.y
  }

  /**
   * Update on game clock update.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Adds Sun to the scene.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const { r, cx, cy } = this.__getElementAttributes()

    this.element = this._svg(
      'circle',
      {
        r: r + '',
        cx: cx - r * 3 + '',
        cy: cy - r * 3 + ''
      },
      [ 'sun' ]
    )
    parent.appendChild(this.element)
  }

  /**
   * Updates the UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    const cx = this._axisX
    const cy = this._axisY
    this._attrSvg(this.element, {cx: cx + '', cy: cy + ''})
  }

  /**
   * Read shared attributes
   * @private
   * @returns {{}}
   */
  __getElementAttributes () {
    this._radius = this._radius || 3
    this._axisX = this._axisX || this._boundingBox.x
    this._axisY = this._axisY || this._boundingBox.y

    return {
      r: this._radius,
      cx: this._axisX,
      cy: this._axisY
    }
  }

  /**
   * Update position on sun based on time.
   * @private
   */
  __handleGameTimeUpdate (clock) {
    const { hour, minute } = clock
    const { x, y, h, w } = this._boundingBox

    const dawn = 6
    const dust = 18

    const currentTime = (hour - dawn) * 60 + minute
    const lengthOfDay = (dust - dawn) /* hours */ * 60 /* in minutes */
    const isDay = hour >= dawn && hour <= dust

    let axisX = -5

    if (isDay) {
      axisX = w * currentTime / lengthOfDay
    }
    const angle = (hour + dawn) * 60 + minute
    const lowerBorder = this._radius + h
    const scale = h

    const axisY = lowerBorder + scale * Math.sin(
      // Rescale to lengthOfDay
      angle * Math.PI / lengthOfDay
    )

    this._axisX = axisX
    this._axisY = axisY
    this._updateView()
  }
}

export { Sun }

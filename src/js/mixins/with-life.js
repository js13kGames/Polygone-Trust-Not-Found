import { WithEventListener } from './with-event-listener'

/**
 * @typedef PropertiesWithLife
 * @mixin
 * @mixes PropertiesWithEventListener
 * @type {{}}
 */

/**
 * Mixin to add functionality regarding life and rendering.
 * @extends WithEventListener
 * @todo Turn into real mixin
 */
class WithLife extends WithEventListener {
  /**
   * @param {PropertiesWithLife}
   */
  constructor (properties) {
    super(properties)

    /**
     * The life of this object.
     * A number between 0 and 100.
     * @type {Number}
     */
    this._life = 100
  }

  /**
   * Reduce life over time.
   * @protected
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   */
  _mapTimeToLife (clock) {
    const { day, hour, minute } = clock
    const dayInMinutes = 24 * 60
    const max = 7 * dayInMinutes
    const current = (day - 1) * dayInMinutes + hour * 60 + minute
    this._life = 100 * (max - current) / max
    this._updateView()
  }

  /**
   * Updates UI.
   * @protected
   */
  _updateView () {
    if (!this.element) {
      throw new Error('Requires Element')
    }
    this.element.style.setProperty('--saturation', this._life + '%', '')
  }
}

export { WithLife }

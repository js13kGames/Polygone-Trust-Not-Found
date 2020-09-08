import { WithLife } from './with-life'

/**
 * @typedef PropertiesWithSympathy
 * @mixin
 * @mixes PropertiesWithLife
 * @type {{}}
 */

/**
 * Mixin adding functionality regarding sympathy and rendering.
 * @extends WithLife
 * @todo Turn into real mixin
 */
class WithSympathy extends WithLife {
  /**
   * @param {PropertiesWithSympathy}
   */
  constructor (properties) {
    super(properties)

    /**
     * The sympathy of this object.
     * A number between -100 and +100.
     * @type {Number}
     */
    this._sympathy = 0
  }

  /**
   * Convert Sympathy value to HSL luminance.
   * @protected
   * @returns {Number}
   */
  _mapSympathyToLuminance () {
    return 50 + this._sympathy / 2
  }

  /**
   * Updates UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    if (!this.element) {
      throw new Error('Requires Element')
    }
    const luminance = this._mapSympathyToLuminance()
    this.element.style.setProperty('--luminance', luminance + '%', '')
  }
}

export { WithSympathy }

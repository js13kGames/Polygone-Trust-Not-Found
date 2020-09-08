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

import { WithSympathy } from './with-sympathy'

/**
 * @typedef PropertiesWithControls
 * @mixes PropertiesWithSympathy
 * @property {{}}     [_controls]
 * @property {Number}  _controls.x
 * @property {Number}  _controls.y
 * @property {Number}  _controls.height
 * @property {Number}  _controls.width
 * @property {Boolean} _controls.isOnRight
 */

/**
 * Mixin in information about controls.
 * @extends WithSympathy
 * @todo Turn into real mixin
 */
class WithControls extends WithSympathy {
  /**
   * @param {PropertiesWithControls} properties
   */
  constructor (properties) {
    super(properties)

    if (properties.controls) {
      const { x, y, height, width, isOnRight } = properties.controls

      /**
       * The game controls.
       * @protected
       */
      this._controls = {
        x,
        y,
        height,
        width,
        isOnRight,
      }
    }
  }
}

export { WithControls }

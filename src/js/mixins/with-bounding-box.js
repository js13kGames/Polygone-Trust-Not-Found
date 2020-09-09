/**
 * @typedef PropertiesWithBoundingBox
 * @mixin
 * @type {{}}
 * @property {Number} x      - The leftmost coordinate.
 * @property {Number} y      - The topmost coordinate.
 * @property {Number} height - The height of this element.
 * @property {Number} width  - The width of this element.
 */

/**
 * Mixin to add functionality regarding bounding box.
 * @todo Turn into real mixin
 */
class WithBoundingBox {
  /**
   * @param {PropertiesWithBoundingBox} properties
   */
  constructor (properties) {
    const { x, y, height, width } = properties.boundingBox

    /**
     * Describes the bounding box of this element
     * @type {{}}
     * @protected
     * @property {Number} x
     * @property {Number} y
     * @property {Number} h
     * @property {Number} w
     */
    this._boundingBox = {
      x,
      y,
      h: height,
      w: width
    }
  }
}

export { WithBoundingBox }

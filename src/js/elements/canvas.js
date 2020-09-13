import { WithParent } from '../mixins/with-parent'

/**
 * This is responsible for adding the `<svg>` to the DOM.
 * @extends WithParent
 */
class Canvas extends WithParent {
  /**
   * Adds a `<svg>` to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox

    this.element = this._svg(
      'svg',
      { viewBox: `${x} ${y} ${w} ${h}` },
      []
    )
    this._attr(this.element, {xmlns: 'http://www.w3.org/2000/svg'})
    parent.appendChild(this.element)
  }
}

export { Canvas }

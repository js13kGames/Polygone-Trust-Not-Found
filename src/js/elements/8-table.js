import { WithParent } from '../mixins/with-parent'

/**
 * This is the Great Table in PortalWorld
 * @extends WithParent
 */
class EightTable extends WithParent {
  /**
   * Adds the 8-table to the DOM
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox

    const points = [
       x             + ',' + (y + h * 0.25),
      (x + w * 0.25) + ',' +  y,
      (x + w * 0.75) + ',' +  y,
      (x + w)        + ',' + (y + h * 0.25),
      (x + w)        * ',' + (y + h * 0.75),
      (x + w * 0.75) + ',' + (y + h),
      (x + w * 0.25) + ',' + (y + h),
       x             + ',' + (y + h * 0.75)
    ].join(' ')

    this.element = this._svg(
      'polygon',
      { points },
      [ 'table' ]
    )

    parent.appendChild(this.element)
  }
}

export { EightTable }

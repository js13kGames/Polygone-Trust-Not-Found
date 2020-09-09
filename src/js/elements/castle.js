import { WithParent } from '../mixins/with-parent'

/**
 * This is the castle in FourCastleWorld
 * @extends {WithParent}
 */
class Castle extends WithParent {
  /**
   * Adds the Castle as composition of SVG Elements to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._createSvgElement(
      'g',
      {},
      [ 'castle' ]
    )

    parent.appendChild(this.element)
    this._mountLeftTower()
    this._mountMain()
    this._mountCrenellations(4)
    this._mountRightTower()
  }

  /**
   * This adds a number of crenellations to the top of the castle.
   * @private
   * @param {Number} numberOfCrenellations
   */
  _mountCrenellations (numberOfCrenellations) {
    const { x, y, h, w } = this._boundingBox

    const breadth = w * 0.7 / (numberOfCrenellations * 2 + 1)
    const left = x + w * 0.15
    const top = y + h * 0.1
    const bottom = y + h * 0.2

    const points = [
      left  + ',' + bottom,
    ]

    for (let i = 1; i < numberOfCrenellations * 2; i += 2) {
      const right = left + (i + 1) * breadth

      points.push((left + i * breadth) + ',' + bottom)
      points.push((left + i * breadth) + ',' + top)
      points.push(right                + ',' + top)
      points.push(right                + ',' + bottom)
    }

    const crenellations = this._createSvgElement(
      'polygon',
      { points: points.join(' ') },
      [ 'crenellations' ]
    )
    this.element.appendChild(crenellations)
  }

  /**
   * This adds the left tower to the castle.
   * @private
   */
  _mountLeftTower () {
    const { x, y, h, w } = this._boundingBox

    const left = x
    const right = x + w * 0.15
    const top = y
    const bottom = y + h

    const points = [
      left  + ',' + bottom,
      left  + ',' + top,
      right + ',' + top,
      right + ',' + bottom
    ].join(' ')

    const tower = this._createSvgElement(
      'polygon',
      { points },
      [ 'tower' ]
    )
    this.element.appendChild(tower)
  }

  /**
   * This adds the main part to the castle.
   * I originally planned to add more details to it, but lacked the time.
   * @private
   */
  _mountMain () {
    const { x, y, h, w } = this._boundingBox

    const left = x + w * 0.15
    const right = x + w - w * 0.15
    const top = y + h * 0.2
    const bottom = y + h

    const points = [
      left  + ',' + bottom,
      left  + ',' + top,
      right + ',' + top,
      right + ',' + bottom
    ].join(' ')

    const main = this._createSvgElement(
      'polygon',
      { points },
      []
    )
    this.element.appendChild(main)
  }

  /**
   * This adds the right tower to the castle.
   * @private
   */
  _mountRightTower () {
    const { x, y, h, w } = this._boundingBox

    const left = x + w - w * 0.15
    const right = x + w
    const top = y
    const bottom = y + h

    const points = [
      left  + ',' + bottom,
      left  + ',' + top,
      right + ',' + top,
      right + ',' + bottom
    ].join(' ')

    const tower = this._createSvgElement(
      'polygon',
      { points },
      [ 'tower' ]
    )
    this.element.appendChild(tower)
  }
}

export { Castle }

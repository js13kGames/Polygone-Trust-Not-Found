import { WithParent } from '../mixins/with-parent'

/**
 * This was meant to become the city in FiveTownWorld.
 * @extends WithParent
 */
class Guild extends WithParent {
  /**
   * Adds a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._svg(
      'g',
      {},
      [ 'guild' ]
    )
    parent.appendChild(this.element)
    this._mountMarket()
  }

  _mountMarket () {
    const { x, y, h, w } = this._boundingBox
    const left = x
    const right = x + w
    const top = y
    const bottom = y + h
    const middle = x + w * 0.5

    const points = [
      left   + ',' + bottom,
      left   + ',' + (top + h * 0.1),
      middle + ',' +  top,
      right  + ',' + (top + h * 0.1),
      right  + ',' + bottom
    ].join(' ')

    const market = this._svg(
      'polygon',
      { points },
      [ 'market' ]
    )

    this.element.appendChild(market)
  }
}

export { Guild }

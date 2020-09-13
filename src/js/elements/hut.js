import { WithParent } from '../mixins/with-parent'

/**
 * This was meant to become the Fishing Hut in ThreeVillageWorld
 * @extends WithParent
 */
class Hut extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    this._hue = 15
    this._updateView()
  }

  /**
   * Adds a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._svg(
      'g',
      {},
      [ 'hut' ]
    )

    parent.appendChild(this.element)
    this.__mountRoof()
    this.__mountBuilding()
  }

  /**
   * Updates the UI
   * @protected
   */
  _updateView () {
    this._cssVar(this.element, {'--hue': this._hue + ''})
  }

  /**
   * Mount the main part of the hut.
   * @private
   */
  __mountBuilding () {
    const { x, y, h, w } = this._boundingBox
    const top = y
    const bottom = y + h * 0.8
    const left = x + w * 0.05
    const right = x + w * 0.95
    const middle = x + w * 0.5

    const points = [
      left   + ',' + bottom,
      middle + ',' + top,
      right  + ',' + bottom
    ].join(' ')

    const roof = this._svg(
      'polygon',
      { points },
      []
    )

    this.element.appendChild(roof)
  }

  /**
   * Mount the roof part of the hut.
   * @private
   */
  __mountRoof () {
    const { x, y, h, w } = this._boundingBox
    const top = y
    const bottom = y + h * 0.6
    const left = x
    const right = x + w
    const middle = x + w * 0.5

    const points = [
      left   + ',' + bottom,
      middle + ',' + top,
      right  + ',' + bottom
    ].join(' ')

    const roof = this._svg(
      'polygon',
      { points },
      []
    )

    this.element.appendChild(roof)
  }
}

export { Hut }

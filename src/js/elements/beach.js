import { WithParent } from '../mixins/with-parent'

/**
 * The beach in ThreeVillageWorld
 * @extends WithParent
 */
class Beach extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    this._hue = 50
    this._updateView()
  }

  /**
   * Adds the beach to the scene
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox
    const left = x
    const right = x + w
    const top = y
    const bottom = y + h

    const points = [
      left  + ',' + bottom,
      right + ',' + top,
      right + ',' + bottom,
    ].join(' ')

    this.element = this._svg(
      'polygon',
      { points },
      [ 'beach' ]
    )

    parent.appendChild(this.element)
  }

  /**
   * Updates the UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    this._cssVar(this.element, {'--hue': this._hue + ''})
  }
}

export { Beach }

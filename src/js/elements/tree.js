import { WithParent } from '../mixins/with-parent'

/**
 * Shows a large tree in ThreeVillageWorld
 * @extends WithParent
 */
class Tree extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    this._hue = 140
    this._updateView()
  }

  /**
   * Adds the tree to the scene.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox

    const left = x
    const right = x + w
    const top = y
    const bottom = y + h
    const middle = y + h * 0.5

    const points = [
      left  + ',' + top,
      right + ',' + middle,
      left  + ',' + bottom,
    ].join(' ')

    this.element = this._svg(
      'polygon',
      { points },
      [ 'tree' ]
    )

    parent.appendChild(this.element)
  }

  /**
   * Updates the UI.
   * @protected
   */
  _updateView () {
    this._cssVar(this.element, {'--hue': this._hue + ''})
  }
}

export { Tree }

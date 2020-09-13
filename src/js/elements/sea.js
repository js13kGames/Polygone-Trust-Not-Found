import { WithParent } from '../mixins/with-parent'

/**
 * This was meant to become the sea in ThreeVillageWorld
 * @extends WithParent
 * @todo Break into ThreeSky and ThreeSea
 */
class Sea extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    this._hue = 250
    this._updateView()
  }

  /**
   * Adds the sea to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._svg(
      'g',
      {},
      [ 'sea' ]
    )
    parent.appendChild(this.element)
    this.__mountSky()
    this.__mountWaves()
  }

  /**
   * Updates the UI
   * @protected
   */
  _updateView () {
    this._cssVar(this.element, {'--hue': this._hue + ''})
  }

  /**
   * Adds the Sky to the scene.
   * @private
   */
  __mountSky () {
    const { x, y, h, w } = this._boundingBox

    const top = y
    const bottom = y + h
    const left = x
    const right = x + w

    const points = [
      left  + ',' + top,
      right + ',' + top,
      right + ',' + bottom
    ].join(' ')

    const sky = this._svg(
      'polygon',
      { points },
      [ 'sky' ]
    )
    this.element.appendChild(sky)
  }

  /**
   * Adds waves to the scene.
   * @private
   */
  __mountWaves () {
    const { x, y, h, w } = this._boundingBox

    const top = y + h * 0.5
    const middle = x + w * 0.5
    const bottom = y + h
    const left = x
    const right = x + w

    const points = [
      left   + ',' + bottom,
      middle + ',' + top,
      right  + ',' + bottom,
    ].join(' ')

    const waves = this._svg(
      'polygon',
      { points },
      [ 'waves' ]
    )
    this.element.appendChild(waves)
  }
}

export { Sea }

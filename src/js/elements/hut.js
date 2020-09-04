import { WithParent } from '../mixins/with-parent'

class Hut extends WithParent {
  _mount (parent) {
    this.element = this._createSvgElement(
      'g',
      {},
      [ 'hut' ]
    )

    parent.appendChild(this.element)
    this._mountRoof()
    this._mountBuilding()
  }

  _mountBuilding () {
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

    const roof = this._createSvgElement(
      'polygon',
      { points },
      []
    )

    this.element.appendChild(roof)
  }

  _mountRoof () {
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

    const roof = this._createSvgElement(
      'polygon',
      { points },
      []
    )

    this.element.appendChild(roof)
  }
}

export { Hut }
import { WithParent } from '../mixins/with-parent'

class Castle extends WithParent {
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

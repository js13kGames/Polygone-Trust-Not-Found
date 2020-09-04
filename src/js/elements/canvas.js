import { WithParent } from '../mixins/with-parent'

class Canvas extends WithParent {
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox

    this.element = this._createSvgElement(
      'svg',
      { viewBox: `${x} ${y} ${w} ${h}` },
      []
    )
    this.element.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    parent.appendChild(this.element)
  }
}

export { Canvas }

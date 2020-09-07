import { VOICES } from '../constants'
import { Person } from './person'

class Narrator extends Person {
  constructor (properties) {
    super(properties)
    this.name = '???'
    this.style = VOICES.DREAMING

    this._hue = 42
    this._updateView()
  }

  _mount (parent) {
    super._mount(parent)
    const { x, y, h, w } = this._boundingBox

    const left   = x + w * 0.1
    const right  = x + w * 0.2
    const top    = y + h * 0.2
    const bottom = y + h * 0.5

    const points = [
       left              + ',' + (top    + h * 0.05),
      (left  + w * 0.05) + ',' +  top,
      (right - w * 0.05) + ',' +  top,
       right             + ',' + (top    + h * 0.05),
       left              + ',' + (bottom - h * 0.05),
      (left  + w * 0.05) + ',' +  bottom,
      (right - w * 0.05) + ',' +  bottom,
       right             + ',' + (bottom - h * 0.05)
    ].join(' ')

    const background = this._createSvgElement(
      'ellipse',
      {
        cx: x + w * 0.15,
        cy: y + h * 0.5,
        rx: w * 0.11,
        ry: h * 0.35
      },
      [ 'speaker-avatar__background' ]
    )

    const avatar = this._createSvgElement(
      'polyline',
      { points },
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--narrator' ]
    )
    avatar.setAttributeNS(null, 'stroke-linecap', 'round')

    this.element.insertBefore(avatar, this.element.firstChild)
    this.element.insertBefore(background, this.element.firstChild)
  }

  _updateView () {
    super._updateView()
    const avatar = this.element.querySelector('.speaker-avatar__pic')
    avatar.style.setProperty('--hue', this._hue + '', '')
  }
}

export { Narrator }

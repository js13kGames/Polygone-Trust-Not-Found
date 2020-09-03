import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class ThreePortal extends WithParent {
  constructor (properties) {
    super(properties)

    this._hue = 0
    this._saturation = 100
    this._luminance = 50
    this._updateView()
  }

  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this._handleGameTimeUpdate.bind(this)
    }
  }

  _handleGameTimeUpdate (clock) {
    if (!clock.hour || !clock.minute) {
      console.warn('Invalid event', clock)
      return
    }

    this._hue = (clock.hour * 60 + clock.minute) / (24 * 60) * 360
    this._updateView()
  }

  _mount (parent) {
    const strokeWidth = 8
    const { x, y, h, w } = this._boundingBox
    const points = [
      (x + w) / 2           + ',' + (y + strokeWidth),
      (x + w - strokeWidth) + ',' + (y + h - strokeWidth),
      (x     + strokeWidth) + ',' + (y + h - strokeWidth),
    ].join(' ')

    this.element = this._createSvgElement(
      'polygon',
      { points },
      [ 'three-portal' ]
    )

    this.element.style.setProperty('--strokeWidth',  strokeWidth + '', '')
    parent.appendChild(this.element)
  }

  _updateView () {
    this.element.style.setProperty('--hue', this._hue + '', '')
    this.element.style.setProperty('--saturation', this._saturation + '%', '')
    this.element.style.setProperty('--luminance', this._luminance + '%', '')
  }
}

export { ThreePortal }
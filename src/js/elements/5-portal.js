import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class FivePortal extends WithParent {
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
      (x + w * 0.5)         + ',' + (y     + strokeWidth),
      (x + w - strokeWidth) + ',' + (y + h * 0.4),
      (x + w * 0.7)         + ',' + (y + h - strokeWidth),
      (x + w * 0.3)         + ',' + (y + h - strokeWidth),
      (x     + strokeWidth) + ',' + (y + h * 0.4)
    ].join(' ')

    this.element = this._createSvgElement(
      'polygon',
      { points },
      [ 'five-portal' ]
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

export { FivePortal }

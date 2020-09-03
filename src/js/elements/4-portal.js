import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class FourPortal extends WithParent {
  constructor (properties) {
    super(properties)

    this._hue = 0
    this._life = 100
    this._sympathy = 0
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
    const { x, y, h, w } = this._boundingBox
    const strokeWidth = 0.08 * w
    const points = [
      (x + w * 0.5)         + ',' + (y     + strokeWidth),
      (x + w - strokeWidth) + ',' + (y + h * 0.5),
      (x + w * 0.5)         + ',' + (y + h - strokeWidth),
      (x     + strokeWidth) + ',' + (y + h * 0.5)
    ].join(' ')

    this.element = this._createSvgElement(
      'polygon',
      { points },
      [ 'four-portal' ]
    )

    this.element.style.setProperty('--strokeWidth',  strokeWidth + '', '')
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    this.element.style.setProperty('--hue', this._hue + '', '')
  }
}

export { FourPortal }

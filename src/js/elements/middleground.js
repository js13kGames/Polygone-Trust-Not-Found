import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class Middleground extends WithParent {
  constructor (properties) {
    super(properties)

    this._hue = 140
    this._life = 50
    this._luminance = 30

    this._timeoutHandle = null
    this._updateView()
  }

  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this._handleGameTimeUpdate.bind(this)
    }
  }

  _handleGameTimeUpdate (clock) {
    // TODO: Extract into mixin
    const isMorning = clock.hour > 5 && clock.hour < 8
    const isEvening = clock.hour > 17 && clock.hour < 20

    const delta = 6 / 60  // change per minute

    if (isEvening) {
      this._luminance -= delta
    }

    if (isMorning) {
      this._luminance += delta
    }

    this._updateView()
  }

  _mount (parent) {
    const { x, y, h, w } = this._boundingBox
    this.element = this._createSvgElement(
      'rect',
      {
        x,
        y,
        height: h,
        width: w
      },
      [ 'middleground' ]
    )

    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    this.element.style.setProperty('--hue', this._hue + '', '')
    this.element.style.setProperty('--luminance', this._luminance + '%', '')
  }
}

export { Middleground }

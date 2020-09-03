import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class Sun extends WithParent {
  constructor (properties) {
    super(properties)

    this._radius = 3
    this._axisX = this._boundingBox.x
    this._axisY = this._boundingBox.y
  }

  _getElementAttributes () {
    this._radius = this._radius || 3
    this._axisX = this._axisX || this._boundingBox.x
    this._axisY = this._axisY || this._boundingBox.y

    return {
      r: this._radius,
      cx: this._axisX,
      cy: this._axisY
    }
  }

  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this._handleGameTimeUpdate.bind(this)
    }
  }

  _handleGameTimeUpdate (clock) {
    const { hour, minute } = clock
    if (!hour || !minute) {
      // TODO: Investigate
      console.warn('Invalid event', clock)
      return
    }

    const { x, y, h, w } = this._boundingBox

    const dawn = 6
    const dust = 18

    const currentTime = (hour - dawn) * 60 + minute
    const lengthOfDay = (dust - dawn) /* hours */ * 60 /* in minutes */
    const isDay = hour >= dawn && hour <= dust

    let axisX = -5

    if (isDay) {
      axisX = w * currentTime / lengthOfDay
    }
    const angle = (hour + dawn) * 60 + minute
    const lowerBorder = this._radius + h
    const scale = h

    const axisY = lowerBorder + scale * Math.sin(
      // Rescale to lengthOfDay
      angle * Math.PI / lengthOfDay
    )

    this._axisX = axisX
    this._axisY = axisY
    this._updateView()
  }

  _mount (parent) {
    const { r, cx, cy } = this._getElementAttributes()

    this.element = this._createSvgElement(
      'circle',
      {
        r: r + '',
        cx: cx - r * 3 + '',
        cy: cy - r * 3 + ''
      },
      [ 'sun' ]
    )
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    const cx = this._axisX
    const cy = this._axisY
    this.element.setAttributeNS(null, 'cx', cx + '')
    this.element.setAttributeNS(null, 'cy', cy + '')
  }
}

export { Sun }

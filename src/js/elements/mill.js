import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class Mill extends WithParent {
  constructor (properties) {
    super(properties)

    const { x, y, h, w } = this._boundingBox
    this._windStrength = 'still'
    this._axisX = x + w * 0.5
    this._axisY = y + h * 0.3
    this.degree = 0

    this._updateView()
  }

  _getElementAttributes () {
    const { x, y, h, w } = this._boundingBox

    this._axisX = this._axisX || x + w * 0.5
    this._axisY = this._axisY || y + h * 0.5
    this._degree = this._degree || 0

    return {
      axisX: this._axisX,
      axisY: this._axisY,
      degree: this._degree
    }
  }

  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this._handleGameTimeUpdate.bind(this),
      [ EVENTS.WIND ]: this._handleWorldWeatherWind.bind(this)
    }
  }

  _handleGameTimeUpdate (clock) {
    if (!clock.hour || !clock.minute) {
      console.warn('Invalid event', clock)
      return
    }

    // Must be divisable by 2/3 without remainder!
    let factor = 1.5

    if (this._windStrength === 'medium') {
      factor = 6
    }

    if (this._windStrength === 'strong') {
      factor = 9
    }

    this._degree = clock.minute * factor
    this._updateView()
  }

  _handleWorldWeatherWind (eventDetail) {
    this._windStrength = eventDetail.wind
    this._updateView()
  }

  _mount (parent) {
    this.element = this._createSvgElement(
      'g',
      {},
      [ 'mill' ]
    )
    parent.appendChild(this.element)
    this._mountBuilding()
    this._mountWings()
  }

  _mountBuilding () {
    const { x, y, h, w } = this._boundingBox

    const left = x + w * 0.3
    const right = x + w * 0.7
    const top = y + h * 0.3
    const bottom = y + h

    const points = [
      left              + ',' + bottom,
      (left + w * 0.1)  + ',' + top,
      (right - w * 0.1) + ',' + top,
      right             + ',' + bottom
    ].join(' ')

    const building = this._createSvgElement(
      'polygon',
      { points },
      []
    )
    this.element.appendChild(building)
  }

  _mountWings () {
    const wings = this._createSvgElement(
      'g',
      {},
      [ 'wings' ]
    )
    this._mountTopWing(wings)
    this._mountRightWing(wings)
    this._mountBottomWing(wings)
    this._mountLeftWing(wings)
    this.element.appendChild(wings)
  }

  _mountBottomWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this._getElementAttributes()

    const left = axisX - w * 0.01
    const right = axisX + w * 0.01
    const top = axisY + h * 0.01
    const bottom = axisY + h * 0.3
    const middle = bottom - h * 0.2

    const points = [
      right              + ',' + top,
      right              + ',' + bottom,
      left               + ',' + bottom,
      left               + ',' + middle,
      (right - w * 0.02) + ',' + middle,
      (right - w * 0.02) + ',' + top
    ].join(' ')

    const wing = this._createSvgElement(
      'polygon',
      { points },
      [ 'bottom', 'wing' ]
    )
    parent.appendChild(wing)
  }

  _mountLeftWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this._getElementAttributes()

    const left = axisX - w * 0.3
    const right = axisX - w * 0.01
    const top = axisY - h * 0.1
    const bottom = axisY + h * 0.01
    const middle = left + w * 0.2

    const points = [
      right  + ',' + bottom,
      left   + ',' + bottom,
      left   + ',' + top,
      middle + ',' + top,
      middle + ',' + (bottom - h * 0.02),
      right  + ',' + (bottom - h * 0.02)
    ].join(' ')

    const wing = this._createSvgElement(
      'polygon',
      { points },
      [ 'left', 'wing' ]
    )
    parent.appendChild(wing)
  }

  _mountRightWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this._getElementAttributes()

    const left = axisX + w * 0.01
    const right = axisX + w * 0.3
    const top = axisY - h * 0.01
    const bottom = axisY + h * 0.1
    const middle = right - w * 0.2

    const points = [
      left   + ',' + top,
      right  + ',' + top,
      right  + ',' + bottom,
      middle + ',' + bottom,
      middle + ',' + (top + h * 0.02),
      left   + ',' + (top + h * 0.02)
    ].join(' ')

    const wing = this._createSvgElement(
      'polygon',
      { points },
      [ 'right', 'wing' ]
    )
    parent.appendChild(wing)
  }

  _mountTopWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this._getElementAttributes()

    const left = axisX - w * 0.01
    const right = axisX + w * 0.1
    const top = axisY + h * 0.3
    const bottom = axisY - h * 0.01
    const middle = top + h * 0.2

    const points = [
      left              + ',' + bottom,
      left              + ',' + top,
      right             + ',' + top,
      right             + ',' + middle,
      (left + w * 0.02) + ',' + middle,
      (left + w * 0.02) + ',' + bottom
    ].join(' ')

    const wing = this._createSvgElement(
      'polygon',
      { points },
      [ 'top', 'wing' ]
    )
    parent.appendChild(wing)
  }

  _updateView () {
    const degree = this._degree
    const origin = this._axisX + ',' + this._axisY
    const rotate = `rotate(${degree},${origin})`

    const wings = this.element.querySelector('.wings')
    wings.setAttributeNS(null, 'transform', rotate)
  }
}

export { Mill }

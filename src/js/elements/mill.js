import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This is the Mill of my first world: FourCastleWorld
 * @extends WithParent
 * @todo Fix wings.
 */
class Mill extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    const { x, y, h, w } = this._boundingBox
    this._windStrength = 'still'
    this._axisX = x + w * 0.5
    this._axisY = y + h * 0.3
    this.degree = 0

    this._updateView()
  }

  /**
   * Register some event listeners.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this),
      [ EVENTS.WIND ]: this.__handleWorldWeatherWind.bind(this)
    }
  }

  /**
   * Add a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._createSvgElement(
      'g',
      {},
      [ 'mill' ]
    )
    parent.appendChild(this.element)
    this.__mountBuilding()
    this.__mountWings()
  }

  /**
   * Update the UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    const degree = this._degree
    const origin = this._axisX + ',' + this._axisY
    const rotate = `rotate(${degree},${origin})`

    const wings = this.element.querySelector('.wings')
    wings.setAttributeNS(null, 'transform', rotate)
  }

  /**
   * Share element attributes regarding axis and degree of rotation
   * @private
   */
  __getElementAttributes () {
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

  /**
   * Update to time change.
   * @private
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    if (typeof clock.hour === 'undefined') {
      console.warn('Invalid event', clock)
      return
    }
    if (typeof clock.minute === 'undefined') {
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

  /**
   * Reaction to wind changes.
   * @private
   * @param {{}} eventDetail
   * @param {string} eventDetail.wind
   */
  __handleWorldWeatherWind (eventDetail) {
    this._windStrength = eventDetail.wind
    this._updateView()
  }

  /**
   * Add the main building to the DOM.
   * @private
   */
  __mountBuilding () {
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

  /**
   * Add the wings to the DOM.
   * @private
   */
  __mountWings () {
    const wings = this._createSvgElement(
      'g',
      {},
      [ 'wings' ]
    )
    this.__mountTopWing(wings)
    this.__mountRightWing(wings)
    this.__mountBottomWing(wings)
    this.__mountLeftWing(wings)
    this.element.appendChild(wings)
  }

  /**
   * Add the bottom wing.
   * @private
   * @param {HTMLElement} parent
   */
  __mountBottomWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this.__getElementAttributes()

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

  /**
   * Add the left wing.
   * @private
   * @param {HTMLElement} parent
   */
  __mountLeftWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this.__getElementAttributes()

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

  /**
   * Add the right wing to the DOM.
   * @private
   * @param {HTMLElement} parent
   */
  __mountRightWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this.__getElementAttributes()

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

  /**
   * Add the top wing to the DOM
   * @private
   * @param {HTMLElement} parent
   */
  __mountTopWing (parent) {
    const { x, y, h, w } = this._boundingBox
    const { axisX, axisY } = this.__getElementAttributes()

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


}

export { Mill }

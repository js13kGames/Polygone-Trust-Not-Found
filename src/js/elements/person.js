import { EVENTS } from '../constants'

import { TextBox } from './textbox'

/**
 * This is the blueprint for adding characters to the game.
 * Inspired by JRPGs dialogs.
 * @extends TextBox
 */
class Person extends TextBox {
  constructor (properties) {
    super(properties)
    this.name = ''

    /**
     * A sync with the game time.
     * @private
     */
    this.__clock = {
      day: 1,
      hour: 0,
      minute: 0,
    }
    this._updateView()
  }

  /**
   * Register event listeners
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Add a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    const { x, y, h, w } = this._boundingBox
    const strokeWidth = h * 0.02
    const speakerBox = this._createSvgElement(
      'rect',
      {
        x: x + w * 0.05,
        y: y + h * 0.53,
        height: h * 0.15,
        width: w * 0.2
      },
      [ 'speaker-box' ]
    )
    speakerBox.style.setProperty('--strokeWidth', strokeWidth + '', '')
    this.element.appendChild(speakerBox)

    const speakerName = this._createSvgElement(
      'text',
      {
        x: x + w * 0.07,
        y: y + h * 0.63
      },
      [ 'speaker-box__text' ]
    )

    const content = document.createTextNode('')

    speakerName.appendChild(content)
    this.element.appendChild(speakerName)

    const text = this.element.querySelector('.textbox__text')
    text.setAttributeNS(null, 'y', y + h * 0.78 + '')
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    const speakerBox = this.element.querySelector('.speaker-box')
    speakerBox.style.setProperty('--hue', this._hue + '', '')

    const speakerName = this.element.querySelector('.speaker-box__text')
    speakerName.style.setProperty('--fontFamily', this.style + '', '')
    speakerName.textContent = this.name
  }

  /**
   * Track the time of this encounter.
   * @private
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    const { day, hour, minute } = clock
    this.__clock.day = day
    this.__clock.hour = hour
    this.__clock.minute = minute
  }
}

export { Person }

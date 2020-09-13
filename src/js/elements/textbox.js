import { EVENTS, VOICES } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This shows a text box in the game.
 * @extends WithParent
 */
class TextBox extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /**
     * The base voice.
     */
    this.style = VOICES.SERIOUS

    /**
     * The shown text.
     */
    this.text = [ '' ]

    this._hue = 42
  }

  /**
   * Show this text.
   * @public
   * @param {Array<string>} messages
   * @param {VOICES} style
   */
  showText (messages) {
    this.text = messages
    this._updateView()
  }

  /**
   * Listen to changes in time.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Add a new element to the UI.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const { x, y, h, w } = this._boundingBox
    const strokeWidth = h * 0.02
    this.element = this._createSvgElement(
      'g',
      {},
      []
    )

    let left = x
    let width = w

    if (this._controls) {
      if (this._controls.isOnRight) {
        if (this._controls.x < left + width) {
          width = this._controls.x - left
        }
      } else {
        if (this._controls.x + this._controls.width > left) {
          left = this._controls.x + this._controls.width
        }
      }
    }

    const box = this._createSvgElement(
      'rect',
      {
        x: left,
        y: y + h * 0.6,
        height: h * 0.5,
        width,
        rx: w * 0.02,
        ry: w * 0.02
      },
      [ 'textbox' ]
    )
    box.style.setProperty('--strokeWidth', strokeWidth + '', '')
    this.element.appendChild(box)

    const text = this._createSvgElement(
      'g',
      {},
      [ 'textbox__text' ]
    )

    this.element.appendChild(text)
    this.__showTextLines()
    parent.appendChild(this.element)
  }

  /**
   * Update the UI.
   * @protected
   */
  _updateView () {
    super._updateView()
    const textbox = this.element.querySelector('.textbox')
    textbox.style.setProperty('--hue', this._hue + '', '')

    const text = this.element.querySelector('.textbox__text')
    text.style.setProperty('--fontFamily', this.style + '', '')
    this.__clearText()
    this.__showTextLines()
  }

  /**
   * Removes previous text from the DOM.
   * @private
   */
  __clearText () {
    const text = this.element.querySelector('.textbox__text')
    if (text.children.length > 0) {
      Array.from(text.children).forEach((child) => text.removeChild(child))
    }
  }

  /**
   * Reduce life over time.
   * @private
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    this._mapTimeToLife(clock)
  }

  /**
   * Add text to the textbox.
   * @private
   */
  __showTextLines () {
    if (!this.text) {
      return
    }

    const { x, y, h, w } = this._boundingBox
    const parent = this.element.querySelector('.textbox__text')

    this.text.forEach((line, index) => {
      const element = this._createSvgElement(
        'text',
        {
          x: x + w * 0.03,
          y: y + h * 0.75 + index * h * 0.1
        },
        []
      )

      const text = document.createTextNode(line)
      element.appendChild(text)
      parent.appendChild(element)
    })
  }
}

export { TextBox }

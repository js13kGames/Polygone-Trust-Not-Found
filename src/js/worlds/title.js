import { EVENTS, WORLDS } from '../constants'
import { t } from '../translations'

import { BaseWorld } from './base'

/**
 * This is the title screen with an option to start the game.
 * @extends BaseWorld
 */
class TitleWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_TITLE')
  }

  /**
   * Adds the logo to the background
   * @protected
   */
  _addBackground () {
    this.__mountLogo()
  }

  /**
   * Adds the New Game button to the foreground
   * @protected
   */
  _addForeground () {
    this.__mountButton()
  }

  /**
   * Register a click event handler.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      click: this.__handleClick.bind(this)
    }
  }

  /**
   * Start game clock
   * @private
   * @param {HTMLElement} eventTarget
   */
  __handleClick (eventTarget) {
    if (!this.isActive()) {
      return
    }
    const event = new CustomEvent(
      EVENTS.START,
      { detail: null }
    )
    this._eventNode.dispatchEvent(event)
  }

  /**
   * Adding the New Game button.
   * @private
   */
  __mountButton () {
    // Asking for new game or continuing
    const { x, y, h, w } = this._boundingBox

    const text = this._createSvgElement(
      'text',
      {
        x: x + w * 0.25,
        y: y + h * 0.85
      },
      [ 'logo__button__text' ]
    )
    const content = document.createTextNode(t('NEW_GAME'))
    text.appendChild(content)
    this.element.appendChild(text)
  }

  /**
   * Mounts the logo image
   * @private
   */
  __mountLogo () {
    const { x, y, h, w } = this._boundingBox

    const points = [
      (x + w * 0.48) + ',' + (y + h * 0.38),
      (x + w * 0.10) + ',' + (y + h * 0.60),
      (x + w * 0.20) + ',' + (y + h * 0.10),
      (x + w * 0.40) + ',' + (y + h * 0.70),
      (x + w * 0.60) + ',' + (y + h * 0.70),
      (x + w * 0.80) + ',' + (y + h * 0.10),
      (x + w * 0.90) + ',' + (y + h * 0.60),
      (x + w * 0.52) + ',' + (y + h * 0.38),
    ].join(' ')

    const logo = this._createSvgElement(
      'polyline',
      {
        pathLength: 1,
        points
      },
      [ 'logo__image' ]
    )
    this.element.appendChild(logo)
  }
}

TitleWorld.worldName = WORLDS.TITLE

export { TitleWorld }

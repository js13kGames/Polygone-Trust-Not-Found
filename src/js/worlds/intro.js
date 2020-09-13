import { DIRECTIONS, EVENTS, WORLDS } from '../constants'
import { t } from '../translations'

import { Narrator } from '../elements/narrator'

import { BaseWorld } from './base'

/**
 * This is the intro scene.
 * @extends BaseWorld
 */
class IntroWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_INTRO')
  }

  /**
   * Adds elements to the scene.
   * @public
   */
  addScene () {
    this._addForeground()
    this.__showIntro()
  }

  /**
   * Adds narrator to the foreground.
   * @protected
   */
  _addForeground () {
    const { x, y, h, w } = this._boundingBox
    const { height, width, isOnRight } = this._controls

    const properties = {
      boundingBox: {
        x: x + w * 0.05,
        y: y + h * 0.40,
        height: h * 0.45,
        width: w * 0.9
      },
      controls: {
        x: this._controls.x,
        y: this._controls.y,
        height,
        width,
        isOnRight,
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    this._narrator = new Narrator(properties)
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
   * Navigate to next world on click.
   * @private
   * @param {HTMLElement} eventTarget
   */
  __handleClick (eventTarget) {
    if (!this.isActive()) {
      return
    }
    const event = new CustomEvent(
      EVENTS.TURN,
      { detail: { direction: DIRECTIONS.TOP } }
    )
    this._eventNode.dispatchEvent(event)
  }

  /**
   * Shows the intro text of the narrator.
   * @private
   */
  __showIntro () {
    this._narrator.showText(t('WELCOME'))
  }
}

/**
 * Unique identifier for this world.
 * @static
 * @readonly
 */
IntroWorld.worldName = WORLDS.INTRO

export { IntroWorld }

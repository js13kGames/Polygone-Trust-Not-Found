import { EVENTS, WORLDS } from '../constants'
import { t } from '../translations'

import { BaseWorld } from './base'

/**
 * GameOver scene.
 * @extends BaseWorld
 */
class GameOverWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_GAME_OVER')
  }

  /**
   * Adds the gameover text to the foreground
   * @protected
   */
  _addForeground () {
    this.__mountGameOver()
  }

  /**
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Updates UI on every tick of the game clock.
   * @private
   * @parameter {{}}     clock
   * @parameter {Number} clock.day
   * @parameter {Number} clock.hour
   * @parameter {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    if (clock.day >= 7) {
      const event = new CustomEvent(
        EVENTS.GAME_OVER,
        { detail: null }
      )
      this._eventNode.dispatchEvent(event)
    }
  }

  /**
   * Adding the Game Over text
   * @private
   */
  __mountGameOver () {
    const { x, y, h, w } = this._boundingBox

    const text = this._svg(
      'text',
      {
        x: x + w * 0.25,
        y: y + h * 0.85
      },
      [ 'logo__button__text' ],
      t('GAME_OVER')
    )
    this.element.appendChild(text)
  }
}

GameOverWorld.worldName = WORLDS.GAME_OVER

export { GameOverWorld }

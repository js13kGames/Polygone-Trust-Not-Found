import { WORLDS } from '../constants'
import { t } from '../translations'

import { Narrator } from '../elements/narrator'

import { BaseWorld } from './base'

/**
 * This is the intro scene.
 * @extends BaseWorld
 */
class IntroWorld extends BaseWorld {
  /**
   * Adds elements to the scene.
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

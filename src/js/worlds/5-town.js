import { EVENTS, WORLDS } from '../constants'
import { t } from '../translations'

import { Guild } from '../elements/guild'
import { Scribe } from '../elements/scribe'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

/**
 * This world represents a medieval town (German style).
 * @extends BaseWorld
 */
class FiveTownWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_FIVE_TOWN')

    /**
     * This world plays Rondo by Tilman Susato, 1551
     */
    this.melody = [
      'a2', 'a1', 'h1', 'C4',
      'C1', 'D1', 'E1', 'C1', 'D2', 'h2',
      'h2', 'h2', 'h2', 'h2',
      'h1', 'C1', 'D1', 'h1', 'C2', 'a2',
      'a2', 'a1', 'h1', 'C2', 'C2',
      'C1', 'D1', 'E1', 'C1', 'D2', 'h2',
      'h1', 'C1', 'D1', 'h1', 'C2', 'h1', 'a1',
      'g1', 'f1', 'a1', 'g1', 'a4'
    ]
  }

  /**
   * You can see the sun in the background
   * @protected
   */
  _addBackground () {
    this.__addSun()
  }

  /**
   * Currently, the foreground is empty.
   * @protected
   */
  _addForeground () {
    this.__addScribe()
  }

  /**
   * You can see guild buildings in the middleground.
   */
  _addMiddleground () {
    this.__addGuild()
  }

  /**
   * Add a guild building to the scene.
   * @private
   */
  __addGuild () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x: x + w * 0.3,
        y: y + h * 0.2,
        height: h * 0.6,
        width: w * 0.4
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Guild(properties)
  }

  /**
   * Adds the scribe to the scene.
   * @private
   */
  __addScribe () {
    const { x, y, h, w } = this._boundingBox
    const { height, width, isOnRight } = this._controls

    const properties = {
      boundingBox: {
        x: x + w * 0.05,
        y: y + h * 0.40,
        height: y + h * 0.45,
        width: w * 0.9,
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

    new Scribe(properties)
  }

  /**
   * Add a sun to the scene.
   * @private
   */
  __addSun () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3

    const properties = {
      boundingBox: {
        x,
        y,
        height: backgroundHeight,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Sun(properties)
  }
}

/**
 * The unique identifier for this town.
 * @static
 * @readonly
 */
FiveTownWorld.worldName = WORLDS.FIVE_TOWN

export { FiveTownWorld }

import { EVENTS, WORLDS } from '../constants'
import { t } from '../translations'

import { Pilot } from '../elements/pilot'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

/**
 * This world features a fallen world of High Tech.
 * Think Monster Ranger anime.
 * @extends BaseWorld
 */
class SixMountainWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /**
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_SIX_MOUNTAIN')
 
    /**
     * This world plays the Kookaburra song (from Australia)
     */
    this.melody = [
      'H1', 'H1', 'H1', 'H1', 'B2', 'C1', 'C1',
      'H2', 'G2', 'H2', 'G2',
      'G1', 'G1', 'G1', 'G1', 'H2', 'H1', 'H1',
      'G2', 'E2', 'G2', 'E2',
      'E4', 'C1', 'D1', 'E1', 'C1',
      'H4', 'H1', 'C1', 'H1', 'A1',
      'G2', 'E2', 'E2', 'E2',
      'E8',
    ]
  }

  /**
   * You can see the sun if you're lucky.
   * @protected
   */
  _addBackground () {
    this.__addSun()
  }

  /**
   * The foreground shows the pilot.
   * @protected
   */
  _addForeground () {
    this.__addPilot()
  }

  /**
   * Currently the middleground is empty.
   * @protected
   */
  _addMiddleground () {
  }

  /**
   * Shows the pilot.
   * @private
   */
  __addPilot () {
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

    new Pilot(properties)
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
 * The unique identififer for this world.
 * @static
 * @readonly
 */
SixMountainWorld.worldName = WORLDS.SIX_MOUNTAIN

export { SixMountainWorld }

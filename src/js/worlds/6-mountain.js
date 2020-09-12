import { EVENTS } from '../constants'

import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

/**
 * This world features a fallen world of High Tech.
 * Think Monster Ranger anime.
 * @extends BaseWorld
 */
class SixMountainWorld extends BaseWorld {
  /**
   * The unique identififer for this world.
   * @static
   */
  static worldName = 'six-mountain'

  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

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
   * Add elements to the scene.
   * @public
   */
  addScene () {
    this._addBackground()
    this.__addSun()
    this._addMiddleground()
    this._addForeground()
  }

  /**
   * Currently, the background is empty.
   * @protected
   */
  _addBackground () {
  }

  /**
   * Currently the foreground is empty.
   * @protected
   */
  _addForeground () {
  }

  /**
   * Currently the middleground is empty.
   * @protected
   */
  _addMiddleground () {
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

export { SixMountainWorld }

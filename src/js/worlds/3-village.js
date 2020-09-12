import { EVENTS } from '../constants'

import { Hut } from '../elements/hut'
import { Sea } from '../elements/sea'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

/**
 * World at the coast. Fishers welcome you.
 * @extends BaseWorld
 */
class ThreeVillageWorld extends BaseWorld {
  /**
   * @param {PropertiesWithParent}
   */
  constructor (properties) {
    super(properties)
    /**
     * This world has a melody.
     * @todo Improve notation.
     */
    this.melody = [
      13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13
    ]
  }

  /**
   * The world shows a sun raising above a coast with sea and sky.
   * In the middleground, you can see a hut.
   * @public
   */
  addScene () {
    this._addBackground()
    this.__addSun()
    this.__addSea()
    this._addMiddleground()
    this._addForeground()
    this.__addHut()
  }

  /**
   * No background.
   * @protected
   */
  _addBackground () {
  }

  /**
   * No foreground.
   * @protected
   */
  _addForeground () {
  }

  /**
   * No middleground.
   * @protected
   */
  _addMiddleground () {
  }

   /**
    * Adds the hut to the scene.
    * @private
    */
   __addHut () {
    const { x, y, h, w } = this._boundingBox
    const controlsWidth = 5 * 3
    const controlsHeight = 5 * 2

    const properties = {
      boundingBox: {
        x: x + controlsWidth,
        y: y + h * 0.7,
        height: y + h * 0.25,
        width: w - controlsWidth * 2
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Hut(properties)
  }

  /**
   * Adds the sea to the scene.
   * @private
   * @todo Split into sea + sky
   */
  __addSea () {
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

    new Sea(properties)
  }

  /**
   * Adds the sun to the scene.
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
 * Unique identifier
 * @static
 * @readonly
 */
ThreeVillageWorld.worldName = 'three-village'

export { ThreeVillageWorld }

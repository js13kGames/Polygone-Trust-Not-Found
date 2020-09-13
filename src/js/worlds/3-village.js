import { EVENTS, WORLDS } from '../constants'
import { t } from '../translations'

import { Beach } from '../elements/beach'
import { Fisherwoman } from '../elements/fisherwoman'
import { Hut } from '../elements/hut'
import { Sea } from '../elements/sea'
import { Sun } from '../elements/sun'
import { Tree } from '../elements/tree'

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
     * Updates the document.title
     * @protected
     */
    this._documentTitle = t('TITLE_THREE_VILLAGE')
 
    /**
     * This world plays What shall we do with a drunken sailor.
     */
    this.melody = [
      'C1', 'C0.5', 'C0.5', 'C1', 'C0.5', 'C0.5',
      'C1', 'f1', 'a1', 'c1',
      'h1', 'h0.5', 'h0.5', 'h1', 'h0.5', 'h0.5',
      'h1', 'e1', 'g1', 'h1',
      'C1', 'C0.5', 'C0.5', 'C1', 'C0.5', 'C0.5',
      'C1', 'D1', 'E1', 'F1',
      'E1', 'C1', 'h1', 'g1',
      'f2', 'f2'
    ]
  }

  /**
   * The background has the sun, the sea and a tree.
   * @protected
   */
  _addBackground () {
    this.__addSun()
    this.__addSea()
    this.__addTree(true)
  }

  /**
   * Adds the hut and the Fisherwoman to the foreground.
   * @protected
   */
  _addForeground () {
    this.__addHut()
    this.__addFisherwoman()
  }

  /**
   * You can see a beach in the middleground
   * @protected
   */
  _addMiddleground () {
    this.__addBeach()
    this.__addTree(false)
  }

  /**
   * Adds the beach to the scene.
   * @private
   */
  __addBeach () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y: y + h * 0.5,
        height: h * 0.5,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Beach(properties)
  }

  /**
   * Adds the fisherwoman to the scene.
   * @private
   */
  __addFisherwoman () {
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

    new Fisherwoman(properties)
  }

  /**
   * Adds the hut to the scene.
   * @private
   */
  __addHut () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x: x + w * 0.15,
        y: y + h * 0.2,
        height: y + h * 0.6,
        width: w * 0.7
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

    const properties = {
      boundingBox: {
        x,
        y,
        height: h * 0.5,
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

  /**
   * Adds the tree to the scene.
   * @private
   */
  __addTree (isBackground) {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x,
        y: isBackground ? y : y + h * 0.5,
        height: h * 0.5,
        width: w * 0.5
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Tree(properties)
  }
}

/**
 * Unique identifier
 * @static
 * @readonly
 */
ThreeVillageWorld.worldName = WORLDS.THREE_VILLAGE

export { ThreeVillageWorld }

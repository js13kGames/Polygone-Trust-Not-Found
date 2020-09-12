import { EVENTS } from '../constants'

import { Background } from '../elements/background'
import { Foreground } from '../elements/foreground'
import { Middleground } from '../elements/middleground'

import { Castle } from '../elements/castle'
import { Knight } from '../elements/knight'
import { Mill } from '../elements/mill'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

/**
 * This world is inspired by mideaval knights.
 * @extends BaseWorld
 */
class FourCastleWorld extends BaseWorld {
  /**
   * The unique identifier for this world.
   * @static
   */
  static worldName = 'four-castle'

  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * This world plays Alouette, a French folk song.
     */
    this.melody = [
      'h3', 'C1',
      'D2', 'D2',
      'C1', 'h1', 'C1', 'D1',
      'h2', 'f2',
      'h3', 'C1',
      'D2', 'D2',
      'C1', 'h1', 'C1', 'D1',
      'h4',
      'h1', 'h1', 'h1', 'h1',
      'h1', 'D1', 'F2',
      'F1', 'G1', 'F1', 'E1',
      'D1', 'C1', 'h2',
      'F1', 'F1', 'F2',
      'f1', 'f1', 'f2',
      'F1', 'F1', 'F2',
      'f1', 'f1', 'f2',
      'F1', 'F1', 'F2',
      'F1', 'f1', 'f2',
      'F4',
      'h3', 'C1',
      'D2', 'D2',
      'C1', 'h1', 'C1', 'D1',
      'h4'
    ]

    /**
     * The return value for changing the wind.
     * @type {Number|null}
     * @private
     */
    this.__windChangeHandle = null
  }

  /**
   * Adds elements to the scene.
   * @public
   */
  addScene () {
    this._addBackground()
    this.__addSun()
    this._addMiddleground()
    this.__addMill()
    this.__addCastle()
    this._addForeground()
    this.__addKnight()

    this.fireWindChange()
    const self = this
    const delay = 4 * 1000  // TODO: Bind to clock
    this.__windChangeHandle = setInterval(self.fireWindChange.bind(self), delay)
  }

  /**
   * Informs the game about a change in the wind.
   * @public
   * @fires {world:wind:change}
   */
  fireWindChange () {
    const dice = this._rollDice()

    const winds = [
      null,
      'still', 'still',
      'medium', 'medium', 'medium',
      'strong'
    ]

    const wind = winds[ dice ]

    /**
     * @event world:wind:change
     * @type {{}}
     * @property {{}}     detail
     * @property {string} detail.wind
     */
    const event = new CustomEvent(EVENTS.WIND, { detail: { wind }})
    this._eventNode.dispatchEvent(event)
  }

  /*
   * Adds the background to the scene.
   * @protected
   */
  _addBackground () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y,
        height: h / 3,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Background(properties)
  }

  /**
   * Adds the foreground
   * @protected
   */
  _addForeground () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3
    const middlegroundHeight = h / 5
    const offset = y + backgroundHeight + middlegroundHeight
    const remainingHeight = h - offset

    const properties = {
      boundingBox: {
        x,
        y: offset,
        height: remainingHeight,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Foreground(properties)
  }

  /**
   * Adds the middleground.
   * @protected
   */
  _addMiddleground () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3

    const properties = {
      boundingBox: {
        x,
        y: backgroundHeight,
        height: h / 5,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Middleground(properties)
  }

  /**
   * Adds the castle to the scene.
   * @private
   */
  __addCastle () {
    const { x, y, h, w } = this._boundingBox
    const controlsHeight = 5 * 2
    const controlsWidth = 5 * 3

    const properties = {
      boundingBox: {
        x: x + controlsWidth,
        y: y + h * 0.4,
        height: h / 4,
        width: x + w * 0.75 - controlsWidth * 2
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Castle(properties)
  }

  /**
   * Adds the knight to the scene.
   * @private
   */
  __addKnight () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x: x + w * 0.05,
        y: y + h * 0.40,
        height: h * 0.45,
        width: w * 0.9,
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Knight(properties)
  }

  /**
   * Adds the mill to the scene.
   * @private
   */
  __addMill () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x: x + w * 0.7,
        y: y + h * 0.3,
        height: h * 0.2,
        width: w * 0.2
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Mill(properties)
  }

  /**
   * Adds a sun to the scene.
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

export { FourCastleWorld }

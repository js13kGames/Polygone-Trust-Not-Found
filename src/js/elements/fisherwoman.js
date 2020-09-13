import { EVENTS, MEMORIES, VOICES, WORLDS } from '../constants'

import { Person } from './person'

/**
 * The character from ThreeVillageWorld.
 * @extends Person
 */
class Fisherwoman extends Person {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /** Name of the Fisherwoman */
    this.name = 'Naomie'
    /** Voice of the Fisherwoman */
    this.style = VOICES.SOFT

    this._hue = 250
    this._updateView()
  }

  /**
   * Listen to world changes.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    const otherEvents = super._getEventMap()
    return Object.assign(otherEvents, {
      [ EVENTS.WORLD ]: this.__handleWorldSwitch.bind(this)
    })
  }

  /**
   * Add new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    this.__mountHat()
    this.__mountFace()
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    this._cssVar(this.element, {'--hue': this._hue + ''})
  }

  /**
   * Listen to when user switched to ThreeVillageWorld.
   * @private
   * @param {{}}     eventDetail
   * @param {String} eventDetail.nextWorld
   */
  __handleWorldSwitch ({ nextWorld }) {
    if (nextWorld === WORLDS.THREE_VILLAGE) {
      this._makeMemory(
        MEMORIES.MET_FISHERWOMAN,        // what
        MEMORIES.ENTERED_THREE_VILLAGE,  // when
        WORLDS.THREE_VILLAGE,            // where
      )
    }
  }


  /**
   * Adds the face of the fisherwoman.
   * @private
   */
  __mountFace () {
    /*
    const { x, y, h, w } = this._boundingBox

    const left = x + w * 0.2
    const right = x + w * 0.8
    const top = y + h * 0.2
    const bottom = y + h
    const middle = left + w * 0.5

    const points = [
      left   + ',' + top,
      middle + ',' + bottom,
      right  + ',' + top,
    ].join(' ')

    const face = this._svg(
      'polygon',
      { points },
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--fisherwoman' ]
    )
    */
    const face = this._svg(
      'g',
      {},
      []
    )
    this.element.insertBefore(face, this.element.firstChild)
  }

  /**
   * Adds the hat of the fisherwoman
   * @private
   */
  __mountHat () {
    /*
    const { x, y, h, w } = this._boundingBox

    const left = x
    const right = x + w
    const top = y
    const bottom = y + h * 0.2
    const middle = left + w * 0.5

    const points = [
      left   + ',' + bottom,
      middle + ',' + top,
      right  + ',' + bottom,
    ].join(' ')

    const hat = this._svg(
      'polygon',
      { points },
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--fisherwoman' ]
    )
    */
    const hat = this._svg(
      'g',
      {},
      []
    )
    this.element.insertBefore(hat, this.element.firstChild)
  }
}

export { Fisherwoman }

import { EVENTS, MEMORIES, VOICES, WORLDS } from '../constants'

import { Person } from './person'

/**
 * The character from FiveTownWorld.
 * @extends Person
 */
class Scribe extends Person {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /** Name of the Scribe */
    this.name = 'Charles'
    /** Voice of the Scribe */
    this.style = VOICES.MONOTONOUS

    this._hue = 80
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
   * Listen to when user switched to FiveTownWorld.
   * @private
   * @param {{}}     eventDetail
   * @param {String} eventDetail.nextWorld
   */
  __handleWorldSwitch ({ nextWorld }) {
    if (nextWorld === WORLDS.FIVE_TOWN) {
      this._makeMemory(
        MEMORIES.MET_SCRIBE,         // what
        MEMORIES.ENTERED_FIVE_TOWN,  // when
        WORLDS.FIVE_TOWN,            // where
      )
    }
  }

  /**
   * Adds the face.
   * @private
   */
  __mountFace () {
    const face = this._svg(
      'g',
      {},
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--scribe' ]
    )
    this.element.insertBefore(face, this.element.firstChild)
  }
}

export { Scribe }

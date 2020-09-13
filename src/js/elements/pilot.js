import { EVENTS, MEMORIES, VOICES, WORLDS } from '../constants'

import { Person } from './person'

/**
 * The character from SixMountainWorld.
 * @extends Person
 */
class Pilot extends Person {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /** Name of the Pilot */
    this.name = 'Lou'
    /** Voice of the Pilot */
    this.style = VOICES.CRAZY

    this._hue = 320
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
    this.__addFace()
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    const avatar = this.element.querySelector('.speaker-avatar__pic--pilot')
    this._cssVar(avatar, {'--hue': this._hue + ''})
  }

  /**
   * Adds the face of the pilot.
   * @private
   */
  __addFace () {
    const face = this._svg(
      'g',
      {},
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--pilot' ]
    )
    this.element.insertBefore(face, this.element.firstChild)
  }

  /**
   * Listen to when user switched to SixMountainWorld.
   * @private
   * @param {{}}     eventDetail
   * @param {String} eventDetail.nextWorld
   */
  __handleWorldSwitch ({ nextWorld }) {
    if (nextWorld === WORLDS.SIX_MOUNTAIN) {
      this._makeMemory(
        MEMORIES.MET_PILOT,             // what
        MEMORIES.ENTERED_SIX_MOUNTAIN,  // when
        WORLDS.SIX_MOUNTAIN,            // where
      )
    }
  }
}

export { Pilot }

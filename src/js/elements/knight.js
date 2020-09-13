import { EVENTS, MEMORIES, VOICES, WORLDS } from '../constants'

import { Person } from './person'

/**
 * The character from FourCastleWorld.
 * @extends Person
 */
class Knight extends Person {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    /** Name of the Knight */
    this.name = 'Leonhard'
    /** Voice of the Knight */
    this.style = VOICES.SERIOUS

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
    this.__mountTopHelmet()
    this.__mountBottomHelmet()
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    const avatars = this.element.querySelectorAll('.speaker-avatar__pic--knight')
    Array.from(avatars).forEach((avatar) => {
      this._cssVar(avatar, {'--hue': this._hue + ''})
    })
  }

  /**
   * Listen to when user switched to FourCastleWorld.
   * @private
   * @param {{}}     eventDetail
   * @param {String} eventDetail.nextWorld
   */
  __handleWorldSwitch ({ nextWorld }) {
    if (nextWorld === WORLDS.FOUR_CASTLE) {
      this._makeMemory(
        MEMORIES.MET_KNIGHT,           // what
        MEMORIES.ENTERED_FOUR_CASTLE,  // when
        WORLDS.FOUR_CASTLE,            // where
      )
    }
  }

  /**
   * Add the bottom of the helmet
   * @private
   */
  __mountBottomHelmet () {
    const { x, y, h, w } = this._boundingBox

    const left   = x + w * 0.10
    const right  = x + w * 0.20
    const top    = y + h * 0.38
    const bottom = y + h * 0.58

    const points = [
      (left  - w * 0.02) + ',' + top,
      (right + w * 0.02) + ',' + top,
       right             + ',' + bottom,
       left              + ',' + bottom,
    ].join(' ')

    const avatar = this._svg(
      'polyline',
      { points },
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--knight' ]
    )

    this.element.insertBefore(avatar, this.element.firstChild)
  }

  /**
   * Add the top of the helmet
   * @private
   */
  __mountTopHelmet () {
    const { x, y, h, w } = this._boundingBox

    const left   = x + w * 0.10
    const right  = x + w * 0.20
    const top    = y + h * 0.18
    const bottom = y + h * 0.35

    const points = [
      (left  - w * 0.02) + ',' + bottom,
       left              + ',' + top,
       right             + ',' + top,
      (right + w * 0.02) + ',' + bottom,
    ].join(' ')

    const avatar = this._svg(
      'polyline',
      { points },
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--knight' ]
    )

    this.element.insertBefore(avatar, this.element.firstChild)
  }
}

export { Knight }

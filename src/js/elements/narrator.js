import { EVENTS, MEMORIES, VOICES, WORLDS } from '../constants'

import { Person } from './person'

/**
 * This is my first character.
 * @extends Person
 */
class Narrator extends Person {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /** Name of the narrator */
    this.name = '???'
    /** Voice of the narrator */
    this.style = VOICES.DREAMING

    this._hue = 42
    this._updateView()
  }

  /**
   * Remember having seen this message.
   * @public
   * @param {Array<string>} messages
   */
  showText (messages) {
    super.showText(messages)
    this.__makeMemory()
  }

  /**
   * Add new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    const { x, y, h, w } = this._boundingBox

    let left   = x + w * 0.1
    let right  = x + w * 0.2
    const top    = y + h * 0.2
    const bottom = y + h * 0.5

    const points = [
       left              + ',' + (top    + h * 0.05),
      (left  + w * 0.05) + ',' +  top,
      (right - w * 0.05) + ',' +  top,
       right             + ',' + (top    + h * 0.05),
       left              + ',' + (bottom - h * 0.05),
      (left  + w * 0.05) + ',' +  bottom,
      (right - w * 0.05) + ',' +  bottom,
       right             + ',' + (bottom - h * 0.05)
    ].join(' ')

    const background = this._createSvgElement(
      'ellipse',
      {
        cx: x + w * 0.15,
        cy: y + h * 0.5,
        rx: w * 0.11,
        ry: h * 0.35
      },
      [ 'speaker-avatar__background' ]
    )

    const avatar = this._createSvgElement(
      'polyline',
      { points },
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--narrator' ]
    )
    avatar.setAttributeNS(null, 'stroke-linecap', 'round')

    this.element.insertBefore(avatar, this.element.firstChild)
    this.element.insertBefore(background, this.element.firstChild)
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    const avatar = this.element.querySelector('.speaker-avatar__pic--narrator')
    avatar.style.setProperty('--hue', this._hue + '', '')
  }

  /**
   * Remember this encounter.
   * @private
   */
  __makeMemory () {
    const { day, hour, minute } = this.__clock

    const when = 'Day ' + day + ' - ' + [
      ('00' + hour).slice(-2),
      ('00' + minute).slice(-2)
    ].join(':')

    const detail = {
      who: this.name,
      when,
      what: MEMORIES.MET_NARRATOR,
      why: MEMORIES.GAME_STARTED,
      where: WORLDS.INTRO,
    }
    const event = new CustomEvent(
      EVENTS.NARRATOR,
      { detail }
    )
    this._eventNode.dispatchEvent(event)
  }
}

export { Narrator }

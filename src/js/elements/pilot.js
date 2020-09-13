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
   * Add new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._svg(
      'g',
      {},
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--pilot' ]
    )
    parent.appendChild(this.element)
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

}

export { Pilot }

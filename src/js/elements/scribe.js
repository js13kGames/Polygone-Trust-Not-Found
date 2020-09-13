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
   * Add new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._svg(
      'g',
      {},
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--scribe' ]
    )
    parent.appendChild(this.element)
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    const avatar = this.element.querySelector('.speaker-avatar__pic--scribe')
    this._cssVar(avatar, {'--hue': this._hue + ''})
  }

}

export { Scribe }

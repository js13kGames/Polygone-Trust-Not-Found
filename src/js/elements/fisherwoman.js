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
   * Add new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._svg(
      'g',
      {},
      [ 'speaker-avatar__pic', 'speaker-avatar__pic--fisherwoman' ]
    )

    parent.appendChild(this.element)
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    super._updateView()
    const avatar = this.element.querySelector('.speaker-avatar__pic--fisherwoman')
    this._cssVar(avatar, {'--hue': this._hue + ''})
  }

}

export { Fisherwoman }

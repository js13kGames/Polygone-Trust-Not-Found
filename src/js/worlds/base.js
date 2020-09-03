import { WithParent } from '../mixins/with-parent'

class BaseWorld extends WithParent {
  static worldName = 'base'

  constructor (properties) {
    super(properties)
    this._isActive = false
    this._updateView()
  }

  addScene () {
    this._addBackground()
    this._addMiddleground()
    this._addForeground()
  }

  isActive () {
    return this._isActive
  }

  setActive () {
    this._isActive = true
    this._updateView()
  }

  setInactive () {
    this._isActive = false
    this._updateView()
  }

  _addBackground () {
    // To be implemented in sub-classes
  }

  _addForeground () {
    // To be implemented in sub-classes
  }

  _addMiddleground () {
    // To be implemented in sub-classes
  }

  _mount (parent) {
    const classes = ['world', 'world--' + this.constructor.worldName]
    this.element = this._createSvgElement('g', {}, classes)
    parent.appendChild(this.element)
  }

  _rollDice (min = 1, max = 6) {
    return Math.floor(Math.random() * ((max - min) + min) + min)
  }

  _updateView () {
    super._updateView()
    if (this.isActive()) {
      this.element.classList.remove('hidden')
    } else {
      this.element.classList.add('hidden')
    }
  }
}

export { BaseWorld }

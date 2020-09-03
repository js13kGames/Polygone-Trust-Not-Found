import { WithLife } from './with-life'

// TODO: Turn into real mixin
class WithSympathy extends WithLife {
  constructor (properties) {
    super(properties)

    this._sympathy = 0
  }

  _updateView () {
    super._updateView()
    if (!this.element) {
      throw new Error('Requires Element')
    }
    const luminance = 50 + this._sympathy / 2
    this.element.style.setProperty('--luminance', luminance + '%', '')
  }
}

export { WithSympathy }
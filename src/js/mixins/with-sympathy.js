import { WithLife } from './with-life'

// TODO: Turn into real mixin
class WithSympathy extends WithLife {
  constructor (properties) {
    super(properties)

    this._sympathy = 0
  }

  _mapSympathyToLuminance () {
    return 50 + this._sympathy / 2
  }

  _updateView () {
    super._updateView()
    if (!this.element) {
      throw new Error('Requires Element')
    }
    const luminance = this._mapSympathyToLuminance()
    this.element.style.setProperty('--luminance', luminance + '%', '')
  }
}

export { WithSympathy }

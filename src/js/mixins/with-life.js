import { WithEventListener } from './with-event-listener'

// TODO: Turn into real mixin
class WithLife extends WithEventListener {
  constructor (properties) {
    super(properties)

    this._life = 100
  }

  _updateView () {
    if (!this.element) {
      throw new Error('Requires Element')
    }
    this.element.style.setProperty('--saturation', this._life + '%', '')
  }
}

export { WithLife }

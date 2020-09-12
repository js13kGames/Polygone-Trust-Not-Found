import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This shows the current time. It was used during development.
 * @extends WithParent
 * @todo Remove from final build.
 */
class Time extends WithParent {
  constructor (properties) {
    super(properties)

    this.clock = {
      hour: 0,
      minute: 0
    }
  }

  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this._handleGameTimeUpdate.bind(this)
    }
  }

  _handleGameTimeUpdate (clock) {
    if (typeof clock.hour === 'undefined') {
      console.warn('Invalid event', clock)
      return
    }
    if (typeof clock.minute === 'undefined') {
      console.warn('Invalid event', clock)
      return
    }

    const hour = clock.hour
    const minute = ('00' + clock.minute).slice(-2)
    this.clock = {
      hour,
      minute
    }
    this._updateView()
  }

  _mount (parent) {
    const { x, y } = this._boundingBox
    this.element = this._createSvgElement(
      'text',
      { x, y },
      [ 'time' ]
    )

    const text = document.createTextNode('')
    this.element.appendChild(text)
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    const { hour, minute } = this.clock
    this.element.textContent = `${hour}:${minute}`
  }
}

export { Time }

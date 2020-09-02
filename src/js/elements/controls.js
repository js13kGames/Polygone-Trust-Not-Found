import { EVENTS } from '../events'
import { WithParent } from '../mixins/with-parent'

class Controls extends WithParent {
  _getEventMap () {
    return { click: this._handleClick.bind(this) }
  }

  _handleClick (eventTarget) {
    const isLeftControl = eventTarget.classList.contains('left')
    const isRightControl = eventTarget.classList.contains('right')

    if (isLeftControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: 'left' }}
      )
      this._eventNode.dispatchEvent(event)
      console.log('Dispatched', event, 'on', this._eventNode)
    }

    if (isRightControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: 'right' }}
      )
      this._eventNode.dispatchEvent(event)
    }
  }

  _mount (parent) {
    this.element = this._createSvgElement('g', {}, [ 'controls' ])
    parent.appendChild(this.element)

    this._mountLeft()
    this._mountTop()
    this._mountRight()
  }

  _mountLeft () {
    const { x, y, h, w } = this._boundingBox
    const top = y + h / 2
    const bottom = y + h
    const left = x
    const right = x + w / 3

    const points = [
      right + ',' + top,
      right + ',' + bottom,
      left  + ',' + (top + bottom) / 2
    ].join(' ')

    const control = this._createSvgElement(
      'polygon',
      { points },
      [ 'left', 'control' ]
    )
    this.element.appendChild(control)
  }

  _mountRight () {
    const { x, y, h, w } = this._boundingBox
    const top = y + h / 2
    const bottom = y + h
    const left = x + w * 2 / 3
    const right = x + w

    const points = [
      left + ',' + top,
      left + ',' + bottom,
      right  + ',' + (top + bottom) / 2
    ].join(' ')

    const control = this._createSvgElement(
      'polygon',
      { points },
      [ 'right', 'control' ]
    )
    this.element.appendChild(control)
  }

  _mountTop () {
    const { x, y, h, w } = this._boundingBox
    const top = y
    const bottom = y + h / 2
    const left = x + w / 3
    const right = x + w * 2 / 3

    const points = [
      right + ',' + bottom,
      left + ',' + bottom,
      (right + left) / 2  + ',' + top
    ].join(' ')

    const control = this._createSvgElement(
      'polygon',
      { points },
      [ 'top', 'control' ]
    )
    this.element.appendChild(control)
  }
}

export { Controls }

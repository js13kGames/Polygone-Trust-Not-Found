import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * These add game controls for moving through the game.
 * @extends WithParent
 */
class Controls extends WithParent {
  /**
   * Adds a click event listener.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return { click: this.__handleClick.bind(this) }
  }

 /**
  * This adds game controls to the UI.
  * @protected
  * @param {HTMLElement} parent
  */
 _mount (parent) {
    this.element = this._createSvgElement('g', {}, [ 'controls' ])
    parent.appendChild(this.element)

    this.__mountLeft()
    this.__mountTop()
    this.__mountRight()
  }

  /**
   * Handles clicks on a control.
   * @private
   * @param {HTMLElement} eventTarget
   * @todo Refactor to reduce code duplication.
   */
  __handleClick (eventTarget) {
    const isLeftControl = eventTarget.classList.contains('left')
    const isRightControl = eventTarget.classList.contains('right')
    const isTopControl = eventTarget.classList.contains('top')

    if (isLeftControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: 'left' }}
      )
      this._eventNode.dispatchEvent(event)
    }

    if (isRightControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: 'right' }}
      )
      this._eventNode.dispatchEvent(event)
    }

    if (isTopControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: 'top' }}
      )
      this._eventNode.dispatchEvent(event)
    }
  }

  /**
   * This adds the game control pointing to the left.
   * @private
   */
  __mountLeft () {
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

  /**
   * This adds the game control pointing to the right.
   * @private
   */
  __mountRight () {
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

  /**
   * This adds the game control pointing to the top.
   * @private
   */
  __mountTop () {
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

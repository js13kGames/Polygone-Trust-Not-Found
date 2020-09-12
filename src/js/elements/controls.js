import { DIRECTIONS, HANDEDNESS, EVENTS } from '../constants'
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
    return {
      [ EVENTS.HANDEDNESS ]: this.__handleHandednessChange.bind(this),
      click: this.__handleClick.bind(this)
    }
  }

  /**
   * This adds game controls to the UI.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._createSvgElement(
      'g',
      {
        'data-handedness': HANDEDNESS.RIGHT
      },
      [ 'controls' ]
    )
    parent.appendChild(this.element)

    this.__mountLeft()
    this.__mountTop()
    this.__mountRight()
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    Array.from(
      this.element.querySelectorAll('.control')
    ).forEach((control) => {
      let points = ''

      if (control.classList.contains('left')) {
        points = this.__getLeftControlsPoints()
      } else if (control.classList.contains('right')) {
        points = this.__getRightControlsPoints()
      } else if (control.classList.contains('top')) {
        points = this.__getTopControlsPoints()
      }

      control.setAttributeNS(null, 'points', points)
    })
  }

  /**
   * Compute the points value for the left control.
   * @private
   * @returns {String}
   */
  __getLeftControlsPoints () {
    const { x, y, h, w } = this._boundingBox
    const { height, width, isOnRight } = this._controls

    const top    = y + h - height / 2
    const bottom = top + height / 2
    const left = isOnRight
      ? x + w - width 
      : x
    const right  = left + width / 3

    const points = [
      right + ',' + top,
      right + ',' + bottom,
      left  + ',' + (top + bottom) / 2
    ].join(' ')

    return points
  }

  /**
   * Compute the points for the right control.
   * @private
   * @returns {String}
   */
  __getRightControlsPoints () {
    const { x, y, h, w } = this._boundingBox
    const { height, width, isOnRight } = this._controls

    const top = y + h - height / 2
    const bottom = top + height / 2
    const left = isOnRight
      ? x + w     - width / 3 
      : x + width - width / 3
    const right = left + width / 3

    const points = [
      left + ',' + top,
      left + ',' + bottom,
      right  + ',' + (top + bottom) / 2
    ].join(' ')

    return points
  }

  /**
   * Compute the points for the top control.
   * @private
   * @returns {String}
   */
  __getTopControlsPoints () {
    const { x, y, h, w } = this._boundingBox
    const { height, width, isOnRight } = this._controls

    const top = y + h - height
    const bottom = top + height / 2
    const left = isOnRight
      ? x + w - width + width / 3
      : x             + width / 3
    const right = left + width / 3

    const points = [
      right + ',' + bottom,
      left + ',' + bottom,
      (right + left) / 2  + ',' + top
    ].join(' ')

    return points
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
        { detail: { direction: DIRECTIONS.LEFT }}
      )
      this._eventNode.dispatchEvent(event)
      return
    }

    if (isRightControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: DIRECTIONS.RIGHT }}
      )
      this._eventNode.dispatchEvent(event)
      return
    }

    if (isTopControl) {
      const event = new CustomEvent(
        EVENTS.TURN,
        { detail: { direction: DIRECTIONS.TOP }}
      )
      this._eventNode.dispatchEvent(event)
      return
    }
  }

  /**
   * User indicated change of handedness
   */
  __handleHandednessChange (eventDetail) {
    this._controls.isOnRight = eventDetail.handedness === HANDEDNESS.RIGHT
    this._updateView()
  }

  /**
   * This adds the game control pointing to the left.
   * @private
   */
  __mountLeft () {
    const control = this._createSvgElement(
      'polygon',
      { points: this.__getLeftControlsPoints() },
      [ 'left', 'control' ]
    )
    this.element.appendChild(control)
  }

  /**
   * This adds the game control pointing to the right.
   * @private
   */
  __mountRight () {
    const control = this._createSvgElement(
      'polygon',
      { points: this.__getRightControlsPoints() },
      [ 'right', 'control' ]
    )
    this.element.appendChild(control)
  }

  /**
   * This adds the game control pointing to the top.
   * @private
   */
  __mountTop () {
    const control = this._createSvgElement(
      'polygon',
      { points: this.__getTopControlsPoints() },
      [ 'top', 'control' ]
    )
    this.element.appendChild(control)
  }
}

export { Controls }

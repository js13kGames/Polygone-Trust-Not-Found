import { EVENTS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * This is the Great Table in PortalWorld
 * @extends WithParent
 */
class EightTable extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * Keeps track of the current day.
     * @private
     */
    this.__day = 1
  }

  /**
   * Listens to updates of the game clock.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    const otherEvents = super._getEventMap()
    return Object.assign(otherEvents, {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    })
  }

  /**
   * Adds the 8-table to the DOM
   */
  _mount (parent) {
   this.element = this._svg(
     'g',
     {},
     [ 'table' ]
   )
   parent.appendChild(this.element)
   this.__mountTable()
   this.__mountText()
  }

  /**
   * Updates the UI.
   * @protected
   * @todo Make translateable
   */
  _updateView () {
    const text = this.element.querySelector('.table__day')
    text.textContent = `Day ${this.__day}`
  }

  /**
   * Update the day in the UI.
   * @private
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   */
  __handleGameTimeUpdate (clock) {
    this.__day = clock.day
    this._updateView()
  }

  /**
   * Adds the table to the scene.
   * @private
   */
  __mountTable () {
    const { x, y, h, w } = this._boundingBox

    const left =   x + w * 0.33
    const right =  x + w * 0.67
    const top =    y + h * 0.33
    const bottom = y + h * 0.67

    const points = [
       left             + ',' + (top    + h * 0.1),
      (left  + w * 0.1) + ',' +  top,
      (right - w * 0.1) + ',' +  top,
       right            + ',' + (top    + h * 0.1),
       right            + ',' + (bottom - h * 0.1),
      (right - w * 0.1) + ',' +  bottom,
      (left  + w * 0.1) + ',' +  bottom,
       left             + ',' + (bottom - h * 0.1)
    ].join(' ')

    const table = this._svg(
      'polygon',
      { points },
      [ 'table__background' ]
    )
    this.element.appendChild(table)
  }

  /**
   * Adds the text to the UI.
   * @private
   * @todo Make translateable
   */
  __mountText () {
    const { x, y, h, w } = this._boundingBox

    const text = this._svg(
      'text',
      {
        x: x + w * 0.37,
        y: y + h * 0.53
      },
      [ 'table__day' ],
      'Day 1',
    )
    this.element.appendChild(text)
  }
}

export { EightTable }

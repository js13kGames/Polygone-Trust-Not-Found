import { EVENTS } from '../constants'
import { t } from '../translations'

import { Tab } from './tab'

/**
 * This builds the memory tab view.
 * It was meant to hold the history of your travel through the worlds.
 * You would forget something by the hour.
 * @extends Tab
 */
class TabMemory extends Tab {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * All memories made in this game.
     * @private
     */
    this.__memories = []
    this._updateView()
  }

  /**
   * React to certain events
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.NARRATOR ]: this.__handleMetNarrator.bind(this)
    }
  }

  /**
   * Add new element to the DOM
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    this._attr(this.element, {id: 'tab-memory'})
    this.__mountMemory()
  }

  /**
   * Update the UI
   * @protected
   */
  _updateView () {
    const header = this.element.querySelector('.tab-view__header')
    header.textContent = t('MEMORY')

    this.__clearMemories()
    this.__renderMemories()
  }

  /**
   * Removes all memories from the UI.
   * @private
   */
  __clearMemories () {
    const list = this.element.querySelector('.memories')
    if (list && list.children.length > 0) {
      this.element.removeChild(list)
    }
  }

  /**
   * Remember the encounter with the narrator
   * @private
   * @param {{}} eventDetail
   * @param {string} eventDetail.who
   * @param {string} eventDetail.when
   * @param {string} eventDetail.what
   * @param {string} eventDetail.why
   * @param {string} eventDetail.where
   */
  __handleMetNarrator (eventDetail) {
    this.__memories.push(eventDetail)
    this._updateView()
  }

  /**
   * Add memory to DOM.
   * @private
   */
  __mountMemory () {
    const memory = this._html(
      'p',
      {},
      [],
      ''
    )
    this.element.appendChild(memory)
  }

  /**
   * Updates UI with all memories
   * @private
   */
  __renderMemories () {
    if (this.__memories.length > 0) {
      this.element.querySelector('p').textContent = ''

      const list = this._html(
        'ol',
        {},
        [ 'memories' ]
      )
      this.element.appendChild(list)

      this.__memories.forEach((memory) => {
        const { who, when, what, why, where } = memory
        const element = this._html(
          'li',
          {},
          [ 'memory' ],
          // TODO: Make translateable
          `I ${what} „${who}” in ${where} at ${when} because ${why}`
        )
        list.appendChild(element)
      })
    } else {
      this.element.querySelector('p').textContent = t('NO_MEMORIES')
    }
  }
}

export { TabMemory }

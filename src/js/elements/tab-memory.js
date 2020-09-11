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
   * Add new element to the DOM
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-memory')
    this.element.querySelector('.tab-view__header').textContent = t('MEMORY')

    this.__mountMemory()
  }

  /**
   * Add memory to DOM.
   * @private
   */
  __mountMemory () {
    const memory = this._createHtmlElement(
      'p',
      {},
      []
    )
    const text = document.createTextNode(t('NO_MEMORIES'))
    memory.appendChild(text)
    this.element.appendChild(memory)
  }
}

export { TabMemory }

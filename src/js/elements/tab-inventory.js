import { t } from '../translations'

import { Tab } from './tab'

/**
 * This builds the inventory tab view.
 * You would collect items from people to bring them to others.
 * @extends Tab
 */
class TabInventory extends Tab {
  /**
   * Add new element to the DOM
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    this._attr(this.element, {id: 'tab-inventory'})
    this.element.querySelector('.tab-view__header').textContent = t('INVENTORY')
    this.__mountInventory()
  }

  /**
   * Add inventory to DOM.
   * @private
   */
  __mountInventory () {
    const inventory = this._html(
      'p',
      {},
      [],
      t('NO_ITEMS')
    )
    this.element.appendChild(inventory)
  }
}

export { TabInventory }

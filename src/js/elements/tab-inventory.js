import { T } from '../translations'

import { Tab } from './tab'

/**
 * This builds the inventory tab view.
 * You would collect items from people to bring them to others.
 * @extends Tab
 */
class TabInventory extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-inventory')

    this.element.textContent = T.NO_ITEMS
  }
}

export { TabInventory }

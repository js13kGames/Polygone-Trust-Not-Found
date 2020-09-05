import { T } from '../translations'

import { Tab } from './tab'

class TabInventory extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-inventory')

    this.element.textContent = T.NO_ITEMS
  }
}

export { TabInventory }

import { T } from '../translations'

import { Tab } from './tab'

class TabMemory extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-memory')

    this.element.textContent = T.NO_MEMORIES
  }
}

export { TabMemory }

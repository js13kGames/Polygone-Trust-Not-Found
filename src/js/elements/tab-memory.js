import { T } from '../translations'

import { Tab } from './tab'

/**
 * This builds the memory tab view.
 * It was meant to hold the history of your travel through the worlds.
 * You would forget something by the hour.
 * @extends Tab
 */
class TabMemory extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-memory')

    this.element.textContent = T.NO_MEMORIES
  }
}

export { TabMemory }

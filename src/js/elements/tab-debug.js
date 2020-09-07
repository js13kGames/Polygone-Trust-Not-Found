import { T } from '../translations'

import { Tab } from './tab'

class TabDebug extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-debug')

    this._mountDebug()
  }

  _mountDebug () {
    const button = this._createHtmlElement(
      'button',
      { id: 'action', type: 'button' },
      []
    )

    button.textContent = T.DEBUG_BUTTON
    this.element.appendChild(button)
  }
}

export { TabDebug }
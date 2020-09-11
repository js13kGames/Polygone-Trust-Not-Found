import { t } from '../translations'

import { Tab } from './tab'

/**
 * This builds the debug tag view.
 * @extends Tab
 * @todo Remove in final build.
 */
class TabDebug extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-debug')
    this.element.querySelector('.tab-view__header').textContent = t('DEBUG')

    this._mountDebug()
  }

  _mountDebug () {
    const button = this._createHtmlElement(
      'button',
      { id: 'action', type: 'button' },
      []
    )

    button.textContent = t('DEBUG_BUTTON')
    this.element.appendChild(button)
  }
}

export { TabDebug }

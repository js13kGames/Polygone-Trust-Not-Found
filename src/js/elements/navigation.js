import { WithParent } from '../mixins/with-parent'
import { t } from '../translations'

import { Share } from './share'
import { TabDebug } from './tab-debug'
import { TabInventory } from './tab-inventory'
import { TabMemory } from './tab-memory'
import { TabSettings } from './tab-settings'

/**
 * This controls the Navigation part in HTML.
 * @extends WithParent
 */
class Navigation extends WithParent {
  /**
   * Adds a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._createHtmlElement(
      'section',
      {},
      []
    )

    parent.appendChild(this.element)
    this.__mountNavigation()
  }

  /**
   * Adds the content of the navigation.
   * @private
   */
  __mountNavigation () {
    const navListItems = [{
      href: '#tab-inventory',
      text: t('INVENTORY')
    }, {
      href: '#tab-memory',
      text: t('MEMORY')
    }, {
      href: '#tab-settings',
      text: t('SETTINGS')
    }, {
      href: '#tab-debug',
      text: t('DEBUG')
    }]

    const nav = this._createHtmlElement(
      'nav',
      {},
      []
    )

    const navList = this._createHtmlElement(
      'ul',
      {},
      [ 'nav-list' ]
    )

    navListItems.forEach((navListItem) => {
      const listItem = this._createHtmlElement(
        'li',
        {},
        [ 'nav-list__item' ]
      )

      const link = this._createHtmlElement(
        'a',
        { href: navListItem.href },
        [ 'nav-link' ]
      )

      const linkText = document.createTextNode(navListItem.text)

      link.appendChild(linkText)
      listItem.appendChild(link)
      navList.appendChild(listItem)
    })

    nav.appendChild(navList)
    this.element.appendChild(nav)

    this.__mountTabViews()
    this.__mountShare()
  }

  /**
   * Mounts share button to the DOM.
   * @private
   */
  __mountShare () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x,
        y,
        height: h,
        width: w
      },
      parent: this.element,
      eventNode: this._eventNode
    }
    new Share(properties)
  }

  /**
   * Add Tab views to DOM.
   * @private
   */
  __mountTabViews () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x,
        y,
        height: h,
        width: w
      },
      parent: this.element,
      eventNode: this._eventNode
    }

    this.tabs = [{
      id: 'inventory', ref: new TabInventory(properties),
    }, {
      id: 'memory', ref: new TabMemory(properties)
    }, {
      id: 'settings', ref: new TabSettings(properties)
    }, {
      id: 'debug', ref: new TabDebug(properties)
    }]
  }
}

export { Navigation }

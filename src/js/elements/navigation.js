import { WithParent } from '../mixins/with-parent'
import { T } from '../translations'

class Navigation extends WithParent {
  _mount (parent) {
    this.element = this._createHtmlElement(
      'section',
      {},
      []
    )

    parent.appendChild(this.element)
    this._mountNavigation()
  }

  _mountNavigation () {
    // TODO: Move somewhere else
    const navListItems = [{
      href: '#tab-inventory',
      text: T.INVENTORY
    }, {
      href: '#tab-memory',
      text: T.MEMORY
    }, {
      href: '#tab-settings',
      text: T.SETTINGS
    }, {
      href: '#tab-debug',
      text: T.DEBUG
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
  }
}

export { Navigation }

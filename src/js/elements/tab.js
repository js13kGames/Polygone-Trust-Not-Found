import { WithParent } from '../mixins/with-parent'

/**
 * This is the base class for Tab Views.
 * @extends WithParent
 */
class Tab extends WithParent {
  _mount(parent) {
    this.element = this._createHtmlElement(
      'section',
      {},
      [ 'tab-view' ]
    )

    const text = document.createTextNode('')

    this.element.appendChild(text)
    parent.appendChild(this.element)
  }
}

export { Tab }

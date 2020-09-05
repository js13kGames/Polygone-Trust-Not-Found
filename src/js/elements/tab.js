import { WithParent } from '../mixins/with-parent'

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

import { WithParent } from '../mixins/with-parent'

/**
 * This is the base class for Tab Views.
 * @extends WithParent
 */
class Tab extends WithParent {
  /**
   * Adds a new tab view to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount(parent) {
    this.element = this._html(
      'section',
      {},
      [ 'tab-view' ],
      ''
    )

    const header = this._html(
      'h2',
      {},
      [ 'tab-view__header' ],
      ''
    )
    this.element.appendChild(header)
    parent.appendChild(this.element)
  }
}

export { Tab }

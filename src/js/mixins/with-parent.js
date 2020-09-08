import { WithSympathy } from './with-sympathy'

/**
 * @typedef PropertiesWithParent
 * @mixes PropertiesWithSympathy
 * @property {HTMLElement} parent
 */

/**
 * Mixin adding functionality about `parent` and mounting.
 * @extends WithSympathy
 * @todo Turn into real mixin
 */
class WithParent extends WithSympathy {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    this._mount(properties.parent)
  }

  /**
   * Creates a new HTML element.
   * @protected
   * @param {String}        name            - The NodeName of the new element.
   * @param {{}}            [attributes={}] - A mapping of attribute keys to values.
   * @param {Array<String>} [classes=[]]    - List of classNames to add.
   * @returns {HTMLElement}
   */
  _createHtmlElement (name, attributes = {}, classes = []) {
    const element = document.createElement(name)

    Object.keys(attributes).forEach((attribute) => {
      const value = attributes[ attribute ]
      element.setAttribute(attribute, value)
    })

    classes.forEach((className) => {
      element.classList.add(className)
    })

    return element
  }

  /**
   * Creates a new SVG element.
   * @protected
   * @param {String}        name       - The NodeName of the new element.
   * @param {{}}            [attributes={}] - A mapping of attribute keys to values.
   * @param {Array<String>} [classes=[]]    - List of classNames to add.
   * @returns {SvgElement}
   */
  _createSvgElement (name, attributes = {}, classes = []) {
    const ns = 'http://www.w3.org/2000/svg'
    const element = document.createElementNS(ns, name)

    Object.keys(attributes).forEach((attribute) => {
      const value = attributes[ attribute ]
      element.setAttributeNS(null, attribute, value)
    })

    classes.forEach((className) => {
      element.classList.add(className)
    })

    return element
  }

  /**
   * Entry point for adding a new Element to the DOM.
   * @abstract
   * @protected
   * @param {HTMLElement} parent - The parent element holding this one.
   */
  _mount (parent) {
    throw new Error('Requires implementation')
  }
}

export { WithParent }

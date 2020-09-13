import { WithControls } from './with-controls'

/**
 * @typedef PropertiesWithParent
 * @mixes PropertiesWithControls
 * @property {HTMLElement} parent
 */

/**
 * Mixin adding functionality about `parent` and mounting.
 * @extends WithControls
 * @todo Turn into real mixin
 */
class WithParent extends WithControls {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)
    this._mount(properties.parent)
  }

  /**
   * Updates an attribute on an HTML element.
   * @protected
   * @param {HTMLElement} element    - Element to update.
   * @param {{}}          [attrs={}] - Key-value pairs of attributes to update.
   */
  _attr (element, attrs = {}) {
    Object.keys(attrs).forEach((name) => {
      const value = attrs[ name ]
      element.setAttribute(name, value)
    })
  }

  /**
   * Updates an attribute on an SVG element.
   * @protected
   * @param {HTMLElement} element    - Element to update.
   * @param {{}}          [attrs={}] - Key-value pairs of attributes to update.
   */
  _attrSvg (element, attrs = {}) {
    Object.keys(attrs).forEach((name) => {
      const value = attrs[ name ]
      element.setAttributeNS(null, name, value)
    })
  }

  /**
   * Updates a CSS Custom Property for given element.
   * @protected
   * @param {HTMLELement} element   - Element to update CSS Variable on.
   * @param {{}}          variables - Key-value pairs of CSS Variables
   */
  _cssVar (element, variables = {}) {
    Object.keys(variables).forEach((name) => {
      const value = variables[ name ]
      element.style.setProperty(name, value, '')
    })
  }

  /**
   * Creates a new HTML element.
   * @protected
   * @param {String}        name            - The NodeName of the new element.
   * @param {{}}            [attributes={}] - A mapping of attribute keys to values.
   * @param {Array<String>} [classes=[]]    - List of classNames to add.
   * @param {String|null}   [content=null]  - Text to append to this element.
   * @returns {HTMLElement}
   */
  _html (name, attributes = {}, classes = [], content = null) {
    const element = document.createElement(name)

    Object.keys(attributes).forEach((attribute) => {
      const value = attributes[ attribute ]
      element.setAttribute(attribute, value)
    })

    classes.forEach((className) => {
      element.classList.add(className)
    })

    if (content != null) {
      const text = document.createTextNode(content)
      element.appendChild(text)
    }

    return element
  }

  /**
   * Creates a new SVG element.
   * @protected
   * @param {String}        name            - The NodeName of the new element.
   * @param {{}}            [attributes={}] - A mapping of attribute keys to values.
   * @param {Array<String>} [classes=[]]    - List of classNames to add.
   * @param {String|null}   [content=null]  - Text to append to this element
   * @returns {SvgElement}
   */
  _svg (name, attributes = {}, classes = [], content = null) {
    const ns = 'http://www.w3.org/2000/svg'
    const element = document.createElementNS(ns, name)

    Object.keys(attributes).forEach((attribute) => {
      const value = attributes[ attribute ]
      element.setAttributeNS(null, attribute, value)
    })

    classes.forEach((className) => {
      element.classList.add(className)
    })

    if (content != null) {
      const text = document.createTextNode(content)
      element.appendChild(text)
    }

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

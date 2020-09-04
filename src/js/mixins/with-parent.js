import { WithSympathy } from './with-sympathy'

// TODO: Turn into real mixin
class WithParent extends WithSympathy {
  constructor (properties) {
    super(properties)
    this._mount(properties.parent)
  }

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

  _mount (parent) {
    throw new Error('Requires implementation')
  }
}

export { WithParent }

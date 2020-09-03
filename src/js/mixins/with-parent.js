import { WithSympathy } from './with-sympathy'

// TODO: Turn into real mixin
class WithParent extends WithSympathy {
  constructor (properties) {
    super(properties)
    this._mount(properties.parent)
  }

  _mount (parent) {
    throw new Error('Requires implementation')
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
}

export { WithParent }

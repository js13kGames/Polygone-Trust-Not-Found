// BIG Kudos to https://stackoverflow.com/a/16484266
class World {
  constructor (element, data) {
    this.element = element
    this.data = data

    element.value = data
    element.addEventListener('change', this, false)
    element.addEventListener('click', this, false)
  }

  handleEvent (event) {
    switch (event.type) {
      case 'change':
        this.handleChange(this.element.value)
        break
      case 'click':
        this.handleClick()
        break
      default:
        // Do nothing
    }
  }

  handleChange (value) {
    this.data = value
    this.element.value = value
  }

  handleClick () {
    this.element.setAttributeNS(null, 'fill', `hsl(50, 0%, ${this.data}%)`)
    this.data += 2
  }
}

new World(document.querySelector('#app rect'), 50)

import { WithParent } from '../mixins/with-parent'

class TextBox extends WithParent {
  constructor (properties) {
    super(properties)
    // Valid options: serif, sans-serif, monospace, cursive, fantasy
    this.style = 'serif'
    this.text = ''

    this._hue = 42
  }

  showText (message, style = 'serif') {
    this.style = style
    this.text = message
    this._updateView()
  }

  _mount (parent) {
    const { x, y, h, w } = this._boundingBox
    const strokeWidth = h * 0.02
    this.element = this._createSvgElement(
      'g',
      {},
      []
    )

    const box = this._createSvgElement(
      'rect',
      {
        x,
        y: y + h * 0.6,
        height: h * 0.5,
        width: w,
        rx: w * 0.02,
        ry: w * 0.02
      },
      [ 'textbox' ]
    )
    box.style.setProperty('--strokeWidth', strokeWidth + '', '')
    this.element.appendChild(box)

    const text = this._createSvgElement(
      'text',
      {
        x: x + w * 0.03,
        y: y + h * 0.73
      },
      [ 'textbox__text' ]
    )

    const content = document.createTextNode('')
    text.appendChild(content)
    this.element.appendChild(text)
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    const textbox = this.element.querySelector('.textbox')
    textbox.style.setProperty('--hue', this._hue + '', '')

    const text = this.element.querySelector('.textbox__text')
    text.style.setProperty('--fontFamily', this.style + '', '')
    text.textContent = this.text
  }
}

export { TextBox }

import { WithParent } from '../mixins/with-parent'

class TextBox extends WithParent {
  constructor (properties) {
    super(properties)
    // Valid options: serif, sans-serif, monospace, cursive, fantasy
    this.style = 'serif'
    this.text = ''
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
        x: x + w * 0.05,
        y: y + h * 0.57,
        height: h * 0.3,
        width: w * 0.9,
        rx: w * 0.02,
        ry: w * 0.02
      },
      [ 'textbox' ]
    )
    box.style.setProperty('--strokeWidth', strokeWidth + '', '')

    const text = this._createSvgElement(
      'text',
      {
        x: x + w * 0.07,
        y: y + h * 0.63
      },
      [ 'textbox__text' ]
    )

    const content = document.createTextNode('')
    text.appendChild(content)
    this.element.appendChild(box)
    this.element.appendChild(text)
    parent.appendChild(this.element)
  }

  _updateView () {
    super._updateView()
    const text = this.element.querySelector('.textbox__text')
    text.style.setProperty('--fontFamily', this.style + '', '')
    text.textContent = this.text
  }
}

export { TextBox }

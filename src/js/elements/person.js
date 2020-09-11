import { TextBox } from './textbox'

/**
 * This is the blueprint for adding characters to the game.
 * Inspired by JRPGs dialogs.
 * @extends TextBox
 */
class Person extends TextBox {
  constructor (properties) {
    super(properties)
    this.name = ''
    this._updateView()
  }

  _mount (parent) {
    super._mount(parent)
    const { x, y, h, w } = this._boundingBox
    const strokeWidth = h * 0.02
    const speakerBox = this._createSvgElement(
      'rect',
      {
        x: x + w * 0.05,
        y: y + h * 0.53,
        height: h * 0.15,
        width: w * 0.2
      },
      [ 'speaker-box' ]
    )
    speakerBox.style.setProperty('--strokeWidth', strokeWidth + '', '')
    this.element.appendChild(speakerBox)

    const speakerName = this._createSvgElement(
      'text',
      {
        x: x + w * 0.07,
        y: y + h * 0.63
      },
      [ 'speaker-box__text' ]
    )

    const content = document.createTextNode('')

    speakerName.appendChild(content)
    this.element.appendChild(speakerName)

    const text = this.element.querySelector('.textbox__text')
    text.setAttributeNS(null, 'y', y + h * 0.78 + '')
  }

  _updateView () {
    super._updateView()
    const speakerBox = this.element.querySelector('.speaker-box')
    speakerBox.style.setProperty('--hue', this._hue + '', '')

    const speakerName = this.element.querySelector('.speaker-box__text')
    speakerName.style.setProperty('--fontFamily', this.style + '', '')
    speakerName.textContent = this.name
  }
}

export { Person }

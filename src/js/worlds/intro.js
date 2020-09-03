import { TextBox } from '../elements/textbox'

import { BaseWorld } from './base'

class IntroWorld extends BaseWorld {
  static worldName = 'intro'

  constructor (properties) {
    super(properties)
  }

  addScene () {
    this._addForeground()
    this._showIntro()
  }

  _addForeground () {
    const { x, y, h, w } = this._boundingBox
    const properties = {
      boundingBox: {
        x,
        y,
        height: h,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    this._textBox = new TextBox(properties)
  }

  _showIntro () {
    this._textBox.showText('Welcome, stranger')
  }
}

export { IntroWorld }

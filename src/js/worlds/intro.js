import { t } from '../translations'

import { Narrator } from '../elements/narrator'

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
        x: x + w * 0.05,
        y: y + h * 0.40,
        height: h * 0.45,
        width: w * 0.9
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    this._narrator = new Narrator(properties)
  }

  _showIntro () {
    this._narrator.showText(t('WELCOME'))
  }
}

export { IntroWorld }

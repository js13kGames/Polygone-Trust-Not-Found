import { EVENTS } from '../constants'

import { Guild } from '../elements/guild'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

class FiveTownWorld extends BaseWorld {
  static worldName = 'five-town'

  constructor (properties) {
    super(properties)
  }

  addScene () {
    this._addBackground()
    this._addSun()
    this._addMiddleground()
    this._addForeground()
    this._addGuild()
  }

  playMusic () {
    /* Taken from https://xem.github.io/miniMusic/simple.html */
    // Frequencies taken from https://pages.mtu.edu/~suits/notefreqs.html
    // See also https://www.artofcomposing.com/how-to-compose-music-101
    // And https://twitter.com/mknol/status/1301193570842484738
    // More tools at https://twitter.com/MaximeEuziere/status/1288918702776356866
    /*
    with(new AudioContext)
    with(G=createGain())
    for(i in D=[1,,,,1,1,,,,,1,,,,1,1])
    with(createOscillator())
    if(D[i])
    connect(G),
    G.connect(destination),
    start(i*.1),
    frequency.setValueAtTime(262*1.06**(13-D[i]),i*.1),
    gain.setValueAtTime(1,i*.1),
    gain.setTargetAtTime(.0001,i*.1+.08,.005),
    stop(i*.1+.09)
    */
  }

  _addBackground () {
  }

  _addForeground () {
  }

  _addGuild () {
    const { x, y, h, w } = this._boundingBox

    const properties = {
      boundingBox: {
        x: x + w * 0.3,
        y: y + h * 0.2,
        height: h * 0.6,
        width: w * 0.4
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Guild(properties)
  }

  _addMiddleground () {
  }

  _addSun () {
    const { x, y, h, w } = this._boundingBox
    const backgroundHeight = h / 3

    const properties = {
      boundingBox: {
        x,
        y,
        height: backgroundHeight,
        width: w
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Sun(properties)
  }
}

export { FiveTownWorld }

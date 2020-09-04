import { EVENTS } from '../constants'

import { Hut } from '../elements/hut'
import { Sea } from '../elements/sea'
import { Sun } from '../elements/sun'

import { BaseWorld } from './base'

class ThreeVillageWorld extends BaseWorld {
  static worldName = 'three-village'

  constructor (properties) {
    super(properties)
  }

  addScene () {
    this._addBackground()
    this._addSun()
    this._addSea()
    this._addMiddleground()
    this._addForeground()
    this._addHut()
  }

  playMusic () {
    /*
    with(new AudioContext)
    with(G=createGain())
    for(i in D=[13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13,,,,13,,,13,,,13,,13,13])
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

  _addHut () {
    const { x, y, h, w } = this._boundingBox
    const controlsWidth = 5 * 3
    const controlsHeight = 5 * 2

    const properties = {
      boundingBox: {
        x: x + controlsWidth,
        y: y + h * 0.7,
        height: y + h * 0.25,
        width: w - controlsWidth * 2
      },
      eventNode: this._eventNode,
      parent: this.element
    }

    new Hut(properties)
  }

  _addMiddleground () {
  }

  _addSea () {
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

    new Sea(properties)
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

export { ThreeVillageWorld }

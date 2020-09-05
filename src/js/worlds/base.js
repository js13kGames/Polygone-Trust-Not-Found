import { WithParent } from '../mixins/with-parent'

class BaseWorld extends WithParent {
  static worldName = 'base'

  constructor (properties) {
    super(properties)
    this.melody = []
    this._isActive = false
    this._updateView()
  }

  addScene () {
    this._addBackground()
    this._addMiddleground()
    this._addForeground()
  }

  isActive () {
    return this._isActive
  }

  playMusic () {
    if (this.melody.length > 0) {
      /* Taken from https://xem.github.io/miniMusic/simple.html */
      // Frequencies taken from https://pages.mtu.edu/~suits/notefreqs.html
      // See also https://www.artofcomposing.com/how-to-compose-music-101
      // And https://twitter.com/mknol/status/1301193570842484738
      // More tools at https://twitter.com/MaximeEuziere/status/1288918702776356866
      const baseFrequency = 262  // 262 equals „middle C”
      const audioContext = new AudioContext()
      const gainNode = audioContext.createGain()
      this.melody.forEach((note, index) => {
        const oscillator = audioContext.createOscillator()
        if (note) {
          oscillator
            .connect(gainNode)
            .connect(audioContext.destination)

          oscillator.start(index * 0.1)
          oscillator.frequency.setValueAtTime(baseFrequency * 1.06 ** (13 - note), index * 0.1)
          gainNode.gain.setValueAtTime(1, index * 0.1)
          gainNode.gain.setTargetAtTime(0.0001, index * 0.1 + 0.08, 0.005)
          oscillator.stop(index * 0.1 + 0.09)
        }
      })
    }
  }

  setActive () {
    this._isActive = true
    this._updateView()
    this.playMusic()
  }

  setInactive () {
    this._isActive = false
    this._updateView()
  }

  _addBackground () {
    // To be implemented in sub-classes
  }

  _addForeground () {
    // To be implemented in sub-classes
  }

  _addMiddleground () {
    // To be implemented in sub-classes
  }

  _mount (parent) {
    const classes = ['world', 'world--' + this.constructor.worldName]
    this.element = this._createSvgElement('g', {}, classes)
    parent.appendChild(this.element)
  }

  _rollDice (min = 1, max = 6) {
    return Math.floor(Math.random() * ((max - min) + min) + min)
  }

  _updateView () {
    super._updateView()
    if (this.isActive()) {
      this.element.classList.remove('hidden')
    } else {
      this.element.classList.add('hidden')
    }
  }
}

export { BaseWorld }

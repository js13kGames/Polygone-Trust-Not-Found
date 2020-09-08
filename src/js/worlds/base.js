import { WithParent } from '../mixins/with-parent'

/**
 * The base class for shared logic of worlds.
 * @extends WithParent
 */
class BaseWorld extends WithParent {
  /** Used as identifier for transitions between worlds. */
  static worldName = 'base'

  /**
   * @param {PropertiesWithParent}
   */
  constructor (properties) {
    super(properties)
    /**
     * Holds the melody to be played while visiting this world.
     * @type {Array<Number|undefined>}
     * @todo Abstract away Numbers to musical notes (= strings).
     */
    this.melody = []
    /**
     * Flag to indicate, whether this world is shown in the UI.
     */
    this._isActive = false
    this._updateView()
  }

  /**
   * Add elements which are present in this world.
   * To easier allow for separation in my mind, I tend to split it up in
   * three chunks. SVG doesn't care however.
   * @public
   */
  addScene () {
    this._addBackground()
    this._addMiddleground()
    this._addForeground()
  }

  /**
   * Is this world currently shown?
   * @public
   * @returns {Boolean}
   */
  isActive () {
    return this._isActive
  }

  /**
   * Inspired by Maxim (but can't used `with` blocks in strict mode.
   * @todo Check against a setting to control volume.
   * @todo Move baseFrequency and timeOfInterval into a constant each.
   * @todo Abstract musical notes away.
   */
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

  /**
   * Show this world.
   * @public
   */
  setActive () {
    this._isActive = true
    this._updateView()
    this.playMusic()
  }

  /**
   * Hide this world.
   * @public
   */
  setInactive () {
    this._isActive = false
    this._updateView()
  }

  /**
   * @protected
   */
  _addBackground () {
    // To be implemented in sub-classes
  }

  /**
   * @protected
   */
  _addForeground () {
    // To be implemented in sub-classes
  }

  /**
   * @protected
   */
  _addMiddleground () {
    // To be implemented in sub-classes
  }

  /**
   * Add a new element to the DOM.
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    const classes = ['world', 'world--' + this.constructor.worldName]
    this.element = this._createSvgElement('g', {}, classes)
    parent.appendChild(this.element)
  }

  /**
   * Meant to randomise certain elements of the world.
   * @protected
   * @param {Number} [min=1] - Lower boundary.
   * @param {Number} [max=6] - Upper boundary.
   * @returns {Number}
   */
  _rollDice (min = 1, max = 6) {
    return Math.floor(Math.random() * ((max - min) + min) + min)
  }

  /**
   * Updates UI of this element.
   */
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

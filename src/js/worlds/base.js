import { EVENTS, NOTES, WORLDS } from '../constants'
import { WithParent } from '../mixins/with-parent'

/**
 * The base class for shared logic of worlds.
 * @extends WithParent
 */
class BaseWorld extends WithParent {
  /**
   * @param {PropertiesWithParent}
   */
  constructor (properties) {
    super(properties)
    /**
     * Holds the melody to be played while visiting this world.
     * @type {Array<Number|undefined>}
     */
    this.melody = []

    /**
     * Flag to indicate, whether this world is shown in the UI.
     * @protected
     */
    this._isActive = false

    /**
     * This is prepended to every document title change.
     * @protected
     */
    this._documentTitle = ''

    /**
     * This is appended to every document title change.
     * @protected
     */
    this._documentTitleRoot = 'Polygone - Trust Not Found - JS13kgames 2020'

    /**
     * Flag to track, whether music is already playing.
     */
    this.__isPlayingMusic = false

    /**
     * How loud shall the music be played?
     * @private
     */
    this.__volume = 0.3;

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
   * Inspired by Maxim (but can't used `with` blocks in strict mode)
   * Taken from {@link https://xem.github.io/miniMusic/simple.html}
   *
   * Assume, each note is an eigth note (quaver). Apply multiplicator
   * @see {@link http://www.sengpielaudio.com/calculator-bpmtempotime.htm|BPM calculus}
   * @todo Check against a setting to control volume.
   */
  playMusic () {
    // See also https://www.artofcomposing.com/how-to-compose-music-101
    // And https://twitter.com/mknol/status/1301193570842484738
    // More tools at https://twitter.com/MaximeEuziere/status/1288918702776356866
    if (this.melody.length > 0 && !this.__isPlayingMusic) {
      const bpm = 120 * 2 /* since quaver instead of crotchet */
      const minInS = 1 * 60
      const bpmForQuaver = minInS / bpm

      const baseFrequency = NOTES.C
      const audioContext = new AudioContext()
      const gainNode = audioContext.createGain()
      const oscillator = audioContext.createOscillator()
      this.__isPlayingMusic = true
      let previousTime = 0.1

      oscillator
        .connect(gainNode)
        .connect(audioContext.destination)

      oscillator.start(previousTime)
      gainNode.gain.setValueAtTime(this.__volume, previousTime)

      this.melody
        .map((note) => {
          const value = note.slice(0, 1)
          const hz = NOTES[ value ]

          const lengthOfNote = parseFloat(note.slice(1))
          const time = bpmForQuaver * lengthOfNote
          
          return {
            hz,
            time
          }
        }).forEach((note, index) => {
          const { hz, time } = note
          oscillator.frequency.setValueAtTime(hz, previousTime)
          previousTime += time
        })

      gainNode.gain.setValueAtTime(0, previousTime + 0.1)
      oscillator.stop(previousTime + 0.1)
      this.__isPlayingMusic = false
    }
  }

  /**
   * Show this world.
   * @public
   */
  setActive () {
    this._isActive = true
    this._updateView()
    document.title = this._documentTitle
      ? [
        this._documentTitle,
        this._documentTitleRoot
      ].join(' | ')
      : this._documentTitleRoot
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
   * Listen to some events.
   * @protected
   * @return {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.VOLUME ]: this.__handleGameVolumeChange.bind(this)
    }
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

  /**
   * Handle change in volume by the user.
   * @private
   * @param {{}}     eventDetail
   * @param {Number} eventDetail.volume
   */
  __handleGameVolumeChange (eventDetail) {
    this.__volume = eventDetail.volume
  }
}

/**
 * Used as identifier for transitions between worlds.
 * @static
 * @readonly
 */
BaseWorld.worldName = WORLDS.BASE

export { BaseWorld }

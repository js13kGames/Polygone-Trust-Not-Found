/**
 * Lists all known Custom Event types.
 * @enum {String}
 */
const EVENTS = {
  INTRO: 'game:memory:narrator',
  TICK: 'game:time:update',
  TURN: 'game:controls:turn',
  VOLUME: 'game:volume:change',
  WIND: 'world:weather:wind',
  WORLD: 'game:world:switch'
}

const MEMORIES = {
  GAME_STARTED: 'Game started',
  MET_NARRATOR: 'Met the narrator'
}

/**
 * Musical notes
 * Frequencies taken from {@link https://pages.mtu.edu/~suits/notefreqs.html}
 * Keys are the musical notes, values are their value in Hz
 */
const NOTES = {
  c: 130.81,
  d: 146.83,
  e: 164.81,
  f: 174.61,
  g: 196.00,
  a: 220.00,
  h: 246.91,
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00,
  H: 493.88,
  B: 523.25, // C transposed by an octave.
}

/**
 * Lists all possible voices.
 * @enum {String}
 */
const VOICES = {
  CRAZY: 'cursive',
  DREAMING: 'fantasy',
  MONOTONOUS: 'monospace',
  SERIOUS: 'serif',
  SOFT: 'sans-serif'
}

/**
 * Unique identifier for all worlds.
 * @enum {String}
 */
const WORLDS = {
  INTRO: 'intro'
}

export {
  EVENTS,
  MEMORIES,
  NOTES,
  VOICES,
  WORLDS,
}

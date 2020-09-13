import { t } from './translations'

/**
 * Lists all known directions
 * @enum {String}
 */
const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
}

/**
 * Lists all known Custom Event types.
 * @enum {String}
 */
const EVENTS = {
  GAME_OVER: 'game:time:stopped',
  HANDEDNESS: 'game:handedness:change',
  INTRO: 'game:memory:narrator',
  START: 'game:time:started',
  TICK: 'game:time:update',
  TURN: 'game:controls:turn',
  VOLUME: 'game:volume:change',
  WIND: 'world:weather:wind',
  WORLD: 'game:world:switch'
}

/**
 * Lists all possible handedness options.
 * @enum {String}
 */
const HANDEDNESS = {
  LEFT: 'left',
  RIGHT: 'right',
}

/**
 * Lists all possible memories.
 * @enum {String}
 */
const MEMORIES = {
  ENTERED_FIVE_TOWN: t('MEMORY_ENTERED_FIVE_TOWN'),
  ENTERED_FOUR_CASTLE: t('MEMORY_ENTERED_FOUR_CASTLE'),
  ENTERED_SIX_MOUNTAIN: t('MEMORY_ENTERED_SIX_MOUNTAIN'),
  ENTERED_THREE_VILLAGE: t('MEMORY_ENTERED_THREE_VILLAGE'),
  GAME_STARTED: t('MEMORY_GAME_STARTED'),
  MET_FISHERWOMAN: t('MEMORY_MET_FISHERWOMAN'),
  MET_KNIGHT: t('MEMORY_MET_KNIGHT'),
  MET_NARRATOR: t('MEMORY_MET_NARRATOR'),
  MET_PILOT: t('MEMORY_MET_PILOT'),
  MET_SCRIBE: t('MEMORY_MET_SCRIBE'),
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
 * Different wind strengths.
 * @enum {String}
 */
const WIND_STRENGTHS = {
  MEDIUM: 'medium',
  STILL: 'still',
  STRONG: 'strong',
}

/**
 * Unique identifier for all worlds.
 * @enum {String}
 */
const WORLDS = {
  BASE: 'base',
  FIVE_PORTAL: 'five-portal',
  FIVE_TOWN: 'five-town',
  FOUR_CASTLE: 'four-castle',
  FOUR_PORTAL: 'four-portal',
  GAME_OVER: 'game-over',
  INTRO: 'intro',
  PORTAL: 'portal',
  SIX_MOUNTAIN: 'six-mountain',
  SIX_PORTAL: 'six-portal',
  THREE_PORTAL: 'three-portal',
  THREE_VILLAGE: 'three-village',
  TITLE: 'title',
}

export {
  DIRECTIONS,
  EVENTS,
  HANDEDNESS,
  MEMORIES,
  NOTES,
  VOICES,
  WIND_STRENGTHS,
  WORLDS,
}

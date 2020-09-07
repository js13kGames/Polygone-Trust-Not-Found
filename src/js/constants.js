/**
 * Lists all known Custom Event types.
 * @enum {String}
 */
const EVENTS = {
  TICK: 'game:time:update',
  TURN: 'game:controls:turn',
  WIND: 'world:weather:wind',
  WORLD: 'game:world:switch'
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

export { EVENTS, VOICES }

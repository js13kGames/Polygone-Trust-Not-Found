/**
 * Look up table for all translations.
 * @enum {String}
 */
const T = {
  DEBUG: 'Debug',
  DEBUG_BUTTON: 'Start time',
  HANDEDNESS: 'Handedness',
  HANDEDNESS_LEFT: 'Left-handed',
  HANDEDNESS_RIGHT: 'Right-handed',
  INVENTORY: 'Inventory',
  LANGUAGE: 'Language',
  LANGUAGE_EN: 'English',
  MEMORY: 'Memory',
  NEW_GAME: 'New Game',
  NO_ITEMS: 'No items.',
  NO_MEMORIES: 'Make some encounters.',
  SETTINGS: 'Settings',
  TYPING: 'Typing speed',
  VOLUME: 'Volume',
  WELCOME: [
    'Oh, good that you are there!',
    'We need your help!'
  ]
}

/**
 * Translates a key into a string.
 * @param {String} key - Key of translation.
 * @returns {String} Translation associated with key.
 */
function t (key) {
  return T[ key ]
}

export { t }

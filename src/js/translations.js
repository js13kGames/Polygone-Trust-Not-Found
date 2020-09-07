/**
 * Look up table for all translations.
 * @enum {String}
 */
const T = {
  DEBUG: 'Debug',
  DEBUG_BUTTON: 'Start time',
  INVENTORY: 'Inventory',
  LANGUAGE: 'Language',
  LANGUAGE_EN: 'English',
  MEMORY: 'Memory',
  NO_ITEMS: 'No items.',
  NO_MEMORIES: 'Make some encounters.',
  SETTINGS: 'Settings',
  TYPING: 'Typing speed',
  WELCOME: 'Welcome, stranger'
}

/**
 * Translates a key into a string.
 * @param {String} key - Key of translation.
 * @returns {String} Translation associated with key.
 */
function t (key) {
  return T[ key ]
}

export { T, t }

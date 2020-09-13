/**
 * Look up table for all translations.
 * @enum {String}
 */
const EN = {
  DEBUG: 'Debug',
  DEBUG_BUTTON: 'Start time',
  HANDEDNESS: 'Handedness',
  HANDEDNESS_LEFT: 'Left-handed',
  HANDEDNESS_RIGHT: 'Right-handed',
  INVENTORY: 'Inventory',
  LANGUAGE: 'Language',
  LANGUAGE_EN: 'English',
  LINK_TITLE: 'I played »Polygone - Trust Not Found«',
  MEMORY: 'Memory',
  NEW_GAME: 'New Game',
  NO_ITEMS: 'No items.',
  NO_MEMORIES: 'Make some encounters.',
  SETTINGS: 'Settings',
  TITLE_FIVE_PORTAL: 'At Five Portal',
  TITLE_FIVE_TOWN: 'At Five Town',
  TITLE_FOUR_CASTLE: 'At Four Castle',
  TITLE_FOUR_PORTAL: 'At Four Portal',
  TITLE_INTRO: 'At the beginning',
  TITLE_PORTAL: 'At Portal',
  TITLE_SIX_MOUNTAIN: 'At Six Mountain',
  TITLE_SIX_PORTAL: 'At Six Portal',
  TITLE_THREE_PORTAL: 'At Three Portal',
  TITLE_THREE_VILLAGE: 'At Three Village',
  TITLE: '',  // Sic!
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
  return EN[ key ]
}

export { t }

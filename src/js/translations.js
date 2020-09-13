/**
 * Look up table for all translations.
 * @enum {String}
 */
const EN = {
  GAME_OVER: 'Game Over',
  HANDEDNESS: 'Handedness',
  HANDEDNESS_LEFT: 'Left-handed',
  HANDEDNESS_RIGHT: 'Right-handed',
  INVENTORY: 'Inventory',
  LANGUAGE: 'Language',
  LANGUAGE_EN: 'English',
  LINK_TITLE: 'Share on Twitter',
  MEMORY: 'Memory',
  MEMORY_ENTERED_FIVE_TOWN: 'entered Five Town',
  MEMORY_ENTERED_FOUR_CASTLE: 'entered Four Castle',
  MEMORY_ENTERED_SIX_MOUNTAIN: 'entered Six Mountain',
  MEMORY_ENTERED_THREE_VILLAGE: 'entered Three Village',
  MEMORY_GAME_STARTED: 'the game started',
  MEMORY_MET_FISHERWOMAN: 'met the Fisherwoman',
  MEMORY_MET_KNIGHT: 'met the Knight',
  MEMORY_MET_NARRATOR: 'met the Narrator',
  MEMORY_MET_PILOT: 'met the Pilot',
  MEMORY_MET_SCRIBE: 'met the Scribe',
  NEW_GAME: 'New Game',
  NO_ITEMS: 'No items.',
  NO_MEMORIES: 'Make some encounters.',
  SETTINGS: 'Settings',
  SHARE_TITLE: 'I played »Polygone - Trust Not Found«',
  TITLE_FIVE_PORTAL: 'At Five Portal',
  TITLE_FIVE_TOWN: 'At Five Town',
  TITLE_FOUR_CASTLE: 'At Four Castle',
  TITLE_FOUR_PORTAL: 'At Four Portal',
  TITLE_GAME_OVER: 'Game Over',
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

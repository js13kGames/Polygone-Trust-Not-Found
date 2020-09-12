import { EVENTS } from '../constants'
import { t } from '../translations'

import { Tab } from './tab'

/**
 * This builds the settings tab view.
 * You could change things like volume or left- or right-handedness.
 * @extends Tab
 * @todo Implement gain setting
 * @todo Implement handedness setting
 */
class TabSettings extends Tab {
  _getEventMap () {
    return {
      change: this.__handleChange.bind(this)
    }
  }

  /**
   * Add new element to the DOM
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-settings')
    this.element.querySelector('.tab-view__header').textContent = t('SETTINGS')

    this.__mountForm()
  }

  __handleChange (eventTarget) {
    const volume = eventTarget.valueAsNumber
    const event = new CustomEvent(
      EVENTS.VOLUME,
      { detail: { volume } }
    )
    this._eventNode.dispatchEvent(event)
  }

  /**
   * Add Settings form to the DOM
   * @private
   */
  __mountForm () {
    const form = this._createHtmlElement(
      'form',
      {
        id: 'form-settings',
        action: '#',
        method: 'GET'
      },
      []
    )

    this.__mountLanguage(form)
    /*
    this.__mountTypingSpeed(form)
    */
    this.__mountVolume(form)
    this.element.appendChild(form)
  }

  /**
   * Relevant to spoken language
   * @private
   * @param {HTMLFormElement} form
   */
  __mountLanguage (form) {
    const languages = [{
      value: 'en', text: t('LANGUAGE_EN')
    }]

    const fieldset = this._createHtmlElement(
      'fieldset',
      {},
      []
    )

    const legend = this._createHtmlElement(
      'legend',
      {},
      []
    )
    const languageLegend = document.createTextNode(t('LANGUAGE'))
    legend.appendChild(languageLegend)

    const languageSelect = this._createHtmlElement(
      'select',
      { name: 'language' },
      []
    )
    const languageLabel = document.createTextNode(t('LANGUAGE'))
    languageSelect.appendChild(languageLabel)

    languages.forEach((lang) => {
      const option = this._createHtmlElement(
        'option',
        { value: lang.value },
        []
      )
      const text = document.createTextNode(lang.text)
      option.appendChild(text)
      languageSelect.appendChild(option)
    })

    fieldset.appendChild(legend)
    fieldset.appendChild(languageSelect)
    form.appendChild(fieldset)
  }

  /**
   * Form settings regarding speed of typing
   * @private
   * @param {HTMLFormElement} form
   */
  /*
  __mountTypingSpeed (form) {
    const typingLabel = this._createHtmlElement(
      'label',
      {},
      []
    )
    const typingLabelText = document.createTextNode(t('TYPING'))
    typingLabel.appendChild(typingLabelText)

    const typingSpeed = this._createHtmlElement(
      'input',
      {
        type: 'range',
        min: 1,
        max: 3,
        step: 1
      },
      []
    )

    form.appendChild(typingLabel)
    form.appendChild(typingSpeed)
  }
  */

  /**
   * Control volume of game sounds.
   * @private
   * @param {HTMLFormElement} form
   */
  __mountVolume (form) {
    const volumeLabel = this._createHtmlElement(
      'label',
      {},
      [ 'settings__label--volume' ]
    )
    const volumeLabelText = document.createTextNode(t('VOLUME'))
    volumeLabel.appendChild(volumeLabelText)

    const volume = this._createHtmlElement(
      'input',
      {
        type: 'range',
        min: 0,
        max: 1,
        value: 0.3,
        step: 0.1
      },
      [ 'settings__label--volume__input' ]
    )

    form.appendChild(volumeLabel)
    form.appendChild(volume)
  }
}

export { TabSettings }

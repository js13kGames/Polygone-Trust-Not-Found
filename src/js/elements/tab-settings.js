import { T } from '../translations'

import { Tab } from './tab'

class TabSettings extends Tab {
  _mount (parent) {
    super._mount(parent)
    this.element.setAttribute('id', 'tab-settings')
    this._mountForm()
  }

  _mountForm () {
    const languages = [{
      value: 'en',
      text: T.LANGUAGE_EN
    }]

    const form = this._createHtmlElement(
      'form',
      {
        id: 'form-settings',
        action: '#',
        method: 'GET'
      },
      []
    )

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
    const languageLegend = document.createTextNode(T.LANGUAGE)
    legend.appendChild(languageLegend)

    const languageSelect = this._createHtmlElement(
      'select',
      { name: 'language' },
      []
    )
    const languageLabel = document.createTextNode(T.LANGUAGE)
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

    const typingLabel = this._createHtmlElement(
      'label',
      {},
      []
    )
    const typingLabelText = document.createTextNode(T.TYPING)
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

    fieldset.appendChild(legend)
    fieldset.appendChild(languageSelect)
    fieldset.appendChild(typingLabel)
    fieldset.appendChild(typingSpeed)

    form.appendChild(fieldset)
    this.element.appendChild(form)
  }
}

export { TabSettings }

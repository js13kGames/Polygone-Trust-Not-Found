import { EVENTS, HANDEDNESS } from '../constants'
import { t } from '../translations'

import { Tab } from './tab'

/**
 * This builds the settings tab view.
 * You can change things like volume or left- or right-handedness.
 * @extends Tab
 */
class TabSettings extends Tab {
  /**
   * Listens to change events
   * @protected
   * @returns {{}}
   */
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
    this._attr(this.element, {id: 'tab-settings'})
    this.element.querySelector('.tab-view__header').textContent = t('SETTINGS')
    this.__mountForm()
  }

  /**
   * Handle change event.
   * @private
   * @param {HTMLElement} eventTarget
   */
  __handleChange (eventTarget) {
    switch (eventTarget.nodeName.toLowerCase()) {
      case 'input':
        this.__handleVolumeChange(eventTarget)
        break
      case 'select':
        this.__handleHandednessChange(eventTarget)
        break
      default:
        console.warn('Unhandled change event', eventTarget)
    }
  }

  /**
   * User indicated change in handedness.
   * @private
   * @param {HTMLSelectElement} selectElement
   */
  __handleHandednessChange (selectElement) {
    const options = Array.from(selectElement.selectedOptions)
    if (options.length === 1) {
      const handedness = options[ 0 ].value
      const event = new CustomEvent(
        EVENTS.HANDEDNESS,
        { detail: { handedness } }
      )
      this._eventNode.dispatchEvent(event)
    }
  }

  /**
   * User picked another volume
   * @private
   * @param {HTMLInputElement} inputElement
   */
  __handleVolumeChange (inputElement) {
    const volume = inputElement.valueAsNumber
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
    const form = this._html(
      'form',
      {
        id: 'form-settings',
        action: '#',
        method: 'GET'
      },
      []
    )

    // TODO: Add Theme switcher
    this.__mountHandedness(form)
    this.__mountVolume(form)
    this.element.appendChild(form)
  }

  /**
   * Left or right handed?
   * @private
   * @param {HTMLFormElement} form
   */
  __mountHandedness (form) {
    const handednessLabel = this._html(
      'label',
      {},
      [],
      t('HANDEDNESS')
    )

    const handedness = [{
      value: HANDEDNESS.LEFT,  text: t('HANDEDNESS_LEFT'), selected: false,
    }, {
      value: HANDEDNESS.RIGHT, text: t('HANDEDNESS_RIGHT'), selected: true,
    }]

    const handednessSelect = this._html(
      'select',
      { name: 'handedness' },
      []
    )

    handedness.forEach((hand) => {
      const option = this._html(
        'option',
        { value: hand.value, selected: hand.selected },
        [],
        hand.text
      )
      handednessSelect.add(option)
    })

    form.appendChild(handednessLabel)
    form.appendChild(handednessSelect)
  }

  /**
   * Control volume of game sounds.
   * @private
   * @param {HTMLFormElement} form
   */
  __mountVolume (form) {
    const volumeLabel = this._html(
      'label',
      {},
      [ 'settings__label--volume' ],
      t('VOLUME')
    )

    const volume = this._html(
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

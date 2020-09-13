import { EVENTS } from '../constants'
import { t } from '../translations'

import { WithParent } from '../mixins/with-parent'

/**
 * Add a share section to the HTML.
 * @extends WithParent
 */
class Share extends WithParent {
  /**
   * @param {PropertiesWithParent} properties
   */
  constructor (properties) {
    super(properties)

    /**
     * The text to share on Twitter.
     * @private
     * @todo Make translateable
     */
    this.__linkText= `${t('SHARE_TITLE')} by @AndreJaenisch`
    this._updateView()
  }

  /**
   * Listen to time updates.
   * @protected
   * @returns {{}}
   */
  _getEventMap () {
    return {
      [ EVENTS.TICK ]: this.__handleGameTimeUpdate.bind(this)
    }
  }

  /**
   * Adds a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._html(
      'p',
      {},
      [ 'share' ]
    )
    parent.appendChild(this.element)
    this.__mountShare()
  }

  /**
   * Updates the UI
   * @protected
   */
  _updateView () {
    const link = this.element.querySelector('.share__link')
    this._attr(link, {href: this.__getHref()})
  }

  /**
   * Constructs the href of the share link.
   * @private
   * @returns {String}
   */
  __getHref () {
    const linkText = this.__linkText
      ? `${this.__linkText} by @AndreJaenisch` 
      : ''
    const tweet = encodeURIComponent(linkText)
    const hashtags = encodeURIComponent([
      'js13k',
      'polygone'
    ].join(','))
    const url = encodeURIComponent(location.href)
    return `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}&url=${url}`
  }

  /**
   * Update the link text
   * @private
   * @param {{}}     clock
   * @param {Number} clock.day
   * @param {Number} clock.hour
   * @param {Number} clock.minute
   * @todo Make translateable
   */
  __handleGameTimeUpdate (clock) {
    const day = clock.day === 1 ? '1 day' : `${clock.day} days`
    const hour = ('00' + clock.hour).slice(-2)
    const minute = ('00' + clock.minute).slice(-2)
    this.__linkText = `I played »Polygone - Trust Not Found« for ${day}, ${hour}:${minute} by @AndreJaenisch`
    this._updateView()
  }

  /**
   * Adds the share link.
   * @private
   * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview}
   */
  __mountShare () {
    const href = this.__getHref()
    const link = this._html(
      'a',
      { href },
      [ 'share__link' ],
      t('LINK_TITLE')
    )
    this.element.appendChild(link)
  }
}

export { Share }

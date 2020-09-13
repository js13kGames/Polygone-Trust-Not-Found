import { t } from '../translations'

import { WithParent } from '../mixins/with-parent'

/**
 * Add a share section to the HTML.
 * @extends WithParent
 */
class Share extends WithParent {
  /**
   * Adds a new element to the DOM.
   * @protected
   * @param {HTMLElement} parent
   */
  _mount (parent) {
    this.element = this._createHtmlElement(
      'p',
      {},
      [ 'share' ]
    )
    parent.appendChild(this.element)
    this.__mountShare()
  }

  /**
   * Adds the share link.
   * @private
   * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview}
   */
  __mountShare () {
    const linkTitle = t('LINK_TITLE')
    const tweet = encodeURIComponent(`${linkTitle} by @AndreJaenisch`)
    const hashtags = encodeURIComponent([
      'js13k',
      'polygone'
    ].join(','))
    const url = encodeURIComponent(location.href)
    const href = `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}&url=${url}`

    const link = this._createHtmlElement(
      'a',
      { href },
      [ 'share__link' ]
    )
    const text = document.createTextNode(linkTitle)
    link.appendChild(text)
    this.element.appendChild(link)
  }
}

export { Share }

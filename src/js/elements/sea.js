import { WithParent } from '../mixins/with-parent'

class Sea extends WithParent {
  constructor (properties) {
    super(properties)
    this._updateView()
  }

  _mount (parent) {
    this.element = this._createSvgElement(
      'g',
      {},
      [ 'sea' ]
    )

    parent.appendChild(this.element)
    // this._mountFilter()
    this._mountSky()
    this._mountWaves()
  }

  _mountFilter () {
    // Based on https://medium.com/swlh/using-the-svg-feturbulence-filter-for-wave-effects-2b8cb2546ee6
    // See also https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/
    this._filterId = 'sea-filter'
    let filter = document.querySelector(`#${this._filterId}`)
    if (filter !== null) {
      // Already created
      return
    }

    filter = this._createSvgElement(
      'filter',
      { id: this._filterId },
      []
    )

    const turbulence = this._createSvgElement(
      'feTurbulence',
      {
        id: 'turbulence',
        type: 'turbulence',
        baseFrequency: '0.042',
        numOctaves: '1',
        result: 'turbulence',
        seed: 5
      },
      []
    )

    const animate = this._createSvgElement(
      'animate',
      {
        id: 'animate',
        attributeName: 'baseFrequency',
        values: '0;0.1;0;0',
        from: '0',
        to: '100',
        dur: '10s',
        repeatCount: 'inifinte'
      },
      []
    )

    const displacement = this._createSvgElement(
      'feDisplacementMap',
      {
        in: 'SourceGraphic',
        in2: 'turbulence',
        scale: '30',
        xChannelSelector: 'R',
        yChannelSelector: 'R',
      },
      []
    )

    filter.appendChild(turbulence)
    filter.appendChild(animate)
    this.element.appendChild(filter)
    this.element.appendChild(displacement)
  }

  _mountSky () {
    const { x, y, h, w } = this._boundingBox

    const top = y
    const middle = y + h * 0.5
    const bottom = y + h
    const left = x
    const right = x + w

    const points = [
      left  + ',' + top,
      right + ',' + top,
      right + ',' + middle
    ].join(' ')

    const sky = this._createSvgElement(
      'polygon',
      {
        points
      },
      [ 'sky' ]
    )
    this.element.appendChild(sky)
  }

  _mountWaves () {
    const { x, y, h, w } = this._boundingBox

    const top = y
    const middle = y + h * 0.5
    const bottom = y + h
    const left = x
    const right = x + w

    const points = [
      right + ',' + middle,
      right + ',' + bottom,
      left  + ',' + bottom,
    ].join(' ')

    const waves = this._createSvgElement(
      'polygon',
      {
        // filter: `url(#${this._filterId})`,
        points
      },
      [ 'waves' ]
    )
    this.element.appendChild(waves)
  }
}

export { Sea }

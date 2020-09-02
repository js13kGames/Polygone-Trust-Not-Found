class WithBoundingBox {
  constructor (properties) {
    const { x, y, height, width } = properties.boundingBox
    this._boundingBox = {
      x,
      y,
      h: height,
      w: width
    }
  }
}

export { WithBoundingBox }

const GIFEncoder = require('gifencoder')
const { createCanvas, Image } = require('canvas')
const fs = require('fs')

class Gif {
  /* eslint-disable no-underscore-dangle */
  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get encoder() {
    return this._encoder
  }

  get canvas() {
    return this._canvas
  }

  constructor(width, height) {
    this._width = width
    this._height = height
    this._encoder = new GIFEncoder(width, height)
    this._canvas = createCanvas(width, height)

    this._encoder.start()
    this._encoder.setRepeat(0)
    this._encoder.setDelay(1000)
    this._encoder.setQuality(10)
  }
  /* eslint-enable no-underscore-dangle */

  async addImage(path) {
    const data = fs.readFileSync(path)
    const image = new Image()
    image.src = data
    const context = this.canvas.getContext('2d')
    context.drawImage(image, 0, 0)
    return this.encoder.addFrame(context)
  }

  async addBuffer(data) {
    const image = new Image()
    image.src = data
    const context = this.canvas.getContext('2d')
    context.drawImage(image, 0, 0)
    return this.encoder.addFrame(context)
  }

  async addImages(paths) {
    const promises = paths.map(async (path) => {
      await this.addImage(path)
    })
    return Promise.all(promises)
  }

  async save(path) {
    await this.encoder.finish()
    const buffer = await this.encoder.out.getData()
    fs.writeFileSync(path, buffer, 'base64')
    return buffer
  }
}

module.exports = Gif

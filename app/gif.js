const GIFEncoder = require('gifencoder')
const { createCanvas, Image } = require('canvas')
const fs = require('fs')

const that = {}

function Gif(width, height) {
  const encoder = new GIFEncoder(width, height)
  const canvas = createCanvas(width, height)
  encoder.start()
  encoder.setRepeat(0)
  encoder.setDelay(1000)
  encoder.setQuality(10)

  that.addImage = async function (path) {
    const data = fs.readFileSync(path)
    const image = new Image()
    image.src = data
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)
    return encoder.addFrame(context)
  }

  that.addImages = async function (paths) {
    paths.forEach(async (path) => {
      await that.addImage(path)
    })
  }

  that.save = async function (path) {
    await encoder.finish()
    const buffer = await encoder.out.getData()
    fs.writeFileSync(path, buffer, 'base64')
    return buffer
  }

  return that
}

module.exports = Gif

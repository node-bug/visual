const path = require('path')
const fs = require('fs')
const { log } = require('@nodebug/logger')
const config = require('@nodebug/config')('visual')

const that = {}

function Files(folder, test, file) {
  const paths = {}
  paths.expected = path.resolve(`${folder}/${test}/`)

  if (config.compare) {
    paths.actual = path.resolve(`./reports/visual/${test}/actual/`)
    paths.diff = path.resolve(`./reports/visual/${test}/diff/`)
  }

  Object.values(paths).forEach((string) => {
    if (!fs.existsSync(string)) {
      fs.mkdirSync(string, { recursive: true })
    }
  })

  that.selectors = `${paths.expected}/selectors.yaml`

  function saveImage(image, filepath) {
    try {
      fs.writeFileSync(filepath, image, 'base64')
      log.info(`Screenshot saved at path ${filepath}`)
      return true
    } catch (err) {
      log.error(`Error while saving file at path ${filepath}`)
      log.error(err.stack)
      throw err
    }
  }

  that.expected = `${paths.expected}/${file}.png`
  that.actual = `${paths.actual}/${file}.png`
  that.diff = `${paths.diff}/${file}.gif`

  that.saveExpected = async (image) => saveImage(image, that.expected)

  that.saveActual = async (image) => saveImage(image, that.actual)

  that.saveDiff = async (image) => saveImage(image, that.diff)

  that.expectedExists = async () => {
    if (!fs.existsSync(that.expected)) {
      log.error(
        `Capture screenshot not found at path ${that.expected}. Please run capture mode.`,
      )
      throw new ReferenceError(
        `Capture screenshot not found at path ${that.expected}. Please run capture mode.`,
      )
    }
    return true
  }

  return that
}

module.exports = Files

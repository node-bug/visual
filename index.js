const { log } = require('@nodebug/logger')
const resemble = require('resemblejs/compareImages')
const config = require('@nodebug/config')('visual')
const Files = require('./app/files')
const Selenium = require('./app/selenium')
const Selectors = require('./app/selectors')

const that = {}

async function VisualObject(browser, path, test) {
  const selenium = new Selenium(browser)
  const name = `${await selenium.os}_${await selenium.browserName}_${await selenium.size}.png`
  const files = new Files(path, test, name)
  const selectors = new Selectors(browser, files.selectors)

  if (config.capture === true) {
    await selectors.update()
    const image = await selenium.takeScreenshot()
    await selectors.reset()

    files.saveExpected(image)
  }

  function compare() {
    try {
      log.debug(
        `Comparing image at path ${files.expected} with ${files.actual}`,
      )
      return resemble(files.expected, files.actual)
    } catch (err) {
      log.info(`Could not compare screenshots due to error.`)
      log.error(err.stack)
      throw err
    }
  }

  that.comparison = async () => {
    if (config.compare === true) {
      // copy files to expected
      files.copyExpected()

      await selectors.update()
      const image = await selenium.takeScreenshot()
      await selectors.reset()

      await files.saveActual(image)
      const result = await compare()
      files.saveDiff(result.getBuffer())

      if (result.misMatchPercentage > 0.01) {
        that.buffer = result.getBuffer()
        that.misMatchPercentage = result.misMatchPercentage
        that.status = 'failed'
        log.info(
          `Actual and expected images mismatch by ${result.misMatchPercentage}%`,
        )
      } else {
        log.info('Actual and expected images match.')
        that.status = 'passed'
      }
    } else {
      log.info('Not comparing as Compare flag is set to false in config file.')
    }
    return that.status
  }

  return that
}

module.exports = VisualObject

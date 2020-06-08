const { log } = require('@nodebug/logger')
const resemble = require('resemblejs/compareImages')
const fs = require('fs')
const selenium = require('./selenium')

async function compare(driver, expectedPath, actualPath, diffPath) {
  const that = {}

  try {
    await selenium.takeScreenshot(driver, actualPath)
    log.debug(`Comparing image at path ${expectedPath} with ${actualPath}`)
    const comparison = await resemble(expectedPath, actualPath)
    fs.writeFileSync(diffPath, comparison.getBuffer(), 'base64')
    log.debug(`Comparison image saved at path ${diffPath}`)
    if (comparison.misMatchPercentage > 0.01) {
      that.buffer = comparison.getBuffer()
      that.misMatchPercentage = comparison.misMatchPercentage
      that.status = 'failed'
      log.info(
        `Actual and expected images mismatch by ${comparison.misMatchPercentage}%`,
      )
    } else {
      log.info('Actual and expected images match.')
      that.status = 'passed'
    }
  } catch (err) {
    log.info(`Could not compare screenshots due to error.`)
    log.error(err.stack)
    throw new Error(err.toString())
  }
  return that
}

module.exports = {
  compare,
}

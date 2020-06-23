const { log } = require('@nodebug/logger')

const that = {}

function Selenium(driver) {
  const my = {}
  my.driver = driver

  that.browserName = (async () =>
    (await my.driver.getCapabilities())
      .get('browserName')
      .replace(/\s/g, ''))()

  that.os = (async () =>
    (await my.driver.getCapabilities())
      .get('platformName')
      .replace(/\s/g, ''))()

  that.size = (async () => {
    const rect = await my.driver.manage().window().getRect()
    return `${rect.width}x${rect.height}`
  })()

  that.takeScreenshot = async () => {
    try {
      await my.driver.wait(() =>
        my.driver.executeScript('return document.readyState == "complete"'),
      )
      const image = await my.driver.takeScreenshot()
      return image
    } catch (err) {
      log.error(`Error while taking screenshot.`)
      log.error(err.stack)
      throw err
    }
  }

  return that
}

module.exports = Selenium

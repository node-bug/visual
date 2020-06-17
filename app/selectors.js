const fs = require('fs')
const yaml = require('js-yaml')
const { log } = require('@nodebug/logger')
const WebElement = require('./WebElement')

const that = {}

function Selectors(driver, path) {
  const my = {}
  my.driver = driver
  my.path = path
  my.content = {
    hide: [],
    waitForVisibility: [],
    waitForInvisibility: [],
  }
  
  function addSelectorsFile() {
    try {
      if (!fs.existsSync(my.path)) {
        fs.writeFileSync(my.path, yaml.safeDump(my.content), 'utf8')
        return true
      }
      const content = fs.readFileSync(my.path, 'utf8')
      my.content = yaml.safeLoad(content)
    } catch (err) {
      log.error(`Error while creating/reading selectors.yaml at ${my.path}`)
      log.error(err.stack)
      throw err
    }
    return false
  }
  addSelectorsFile()

  async function hideSelectors() {
    my.content.hide.forEach((element) => {
      const webelement = new WebElement(driver, element)
      log.debug(`Hiding element ${element.name} on the page`)
      webelement.hide()
    })
    await my.driver.wait(() =>
      my.driver.executeScript('return document.readyState == "complete"'),
    )
  }

  async function unhideSelectors() {
    my.content.hide.forEach(async (element) => {
      const webelement = new WebElement(driver, element)
      log.debug(`Unhiding element ${element.name} on the page`)
      webelement.unhide()
    })
    await my.driver.wait(() =>
      my.driver.executeScript('return document.readyState == "complete"'),
    )
  }

  that.update = async () => {
    // await waitForVisibility()
    // await waitForInvisibility()
    return hideSelectors()
  }

  that.reset = async () => unhideSelectors()
  
  return that
}

module.exports = Selectors

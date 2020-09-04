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

  that.hideSelectors = async () => {
    await Promise.all(
      my.content.hide.map(async (element) => {
        const Element = new WebElement(my.driver, element)
        log.debug(`Hiding element ${element.name} on the page`)
        return Element.hide()
      }),
    )
    return my.driver.wait(() =>
      my.driver.executeScript('return document.readyState == "complete"'),
    )
  }

  that.unhideSelectors = async () => {
    await Promise.all(
      my.content.hide.map(async (element) => {
        const Element = new WebElement(my.driver, element)
        log.debug(`Unhiding element ${element.name} on the page`)
        return Element.unhide()
      }),
    )
    return my.driver.wait(() =>
      my.driver.executeScript('return document.readyState == "complete"'),
    )
  }

  async function genericAssertElement(p) {
    const timeout = p.element.timeout * 1000
    const { implicit } = await my.driver.manage().getTimeouts()
    await my.driver.manage().setTimeouts({ implicit: 1000 })

    let status
    const WebElementObject = new WebElement(my.driver, p.element)
    log.info(`Waiting for ${p.element.name} to be ${p.condition}`)

    try {
      switch (p.condition.toLowerCase()) {
        case 'disabled':
          await my.driver.manage().setTimeouts({ implicit })
          status = !(await WebElementObject.isEnabled())
          log.debug(`WebElement ${p.element.name} is disabled on page. PASS`)
          break
        case 'present':
          status = await WebElementObject.isPresent(timeout)
          log.debug(`WebElement ${p.element.name} is present on page. PASS`)
          break
        case 'not present':
          status = await WebElementObject.isNotPresent(timeout)
          log.debug(`WebElement ${p.element.name} is not present on page. PASS`)
          break
        default:
          log.debug(
            `${p.condition.toLowerCase()} case is not defined in visual. FAIL`,
          )
      }
    } finally {
      await my.driver.manage().setTimeouts({ implicit })
    }

    return status
  }

  that.waitForVisibility = async () => {
    // eslint-disable-next-line func-names
    await Promise.all(
      my.content.waitForVisibility.map(async (element) => {
        try {
          await genericAssertElement({
            condition: 'present',
            element,
          })
        } catch (err) {
          log.info(
            `Element ${element.name} not present on page after ${element.timeout} second wait`,
          )
          throw err
        }
        return true
      }),
    )
  }

  that.waitForInvisibility = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const element of my.content.waitForInvisibility) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await genericAssertElement({
          condition: 'not present',
          element,
        })
      } catch (err) {
        log.info(
          `Element ${element.name} present on page after ${element.timeout} second wait`,
        )
        throw err
      }
    }
  }

  return that
}

module.exports = Selectors

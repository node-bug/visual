const { log } = require('@nodebug/logger')
const config = require('./app/config')
const Files = require('./app/files')
const Driver = require('./app/selenium')
const resemble = require('resemblejs/compareImages')
const that = {}

async function VisualObject(browser, path, test){
    const driver = new Driver(browser);
    const name = `${await driver.browserName}_${await driver.size}.png`
    const files = new Files(path, test, name);

    if(config.capture === true){
       driver.takeScreenshot().then(image => 
        files.saveExpected(image)
       )
    }

    that.comparison = async () => {
      if(config.compare === true){
        //copy files to expected
        files.copyExpected()
        const image = await driver.takeScreenshot()
        await files.saveActual(image)
        const resemble = await compare();
        files.saveDiff(resemble.getBuffer())

        if (resemble.misMatchPercentage > 0.01) {
          that.buffer = resemble.getBuffer()
          that.misMatchPercentage = resemble.misMatchPercentage
          that.status = 'failed'
            log.info(
              `Actual and expected images mismatch by ${resemble.misMatchPercentage}%`,
            )
          } else {
            log.info('Actual and expected images match.')
            that.status = 'passed'
        }
      } else {
        log.info(
          'Not comparing as Compare flag is set to false in config file.'
        )
      }
      return that.status
    }

    function compare() {
        try {
          log.debug(`Comparing image at path ${files.expected} with ${files.actual}`)
          return resemble(files.expected, files.actual)
        } catch (err) {
          log.info(`Could not compare screenshots due to error.`)
          log.error(err.stack)
          throw err
        }
      }

    return that
}

module.exports = VisualObject
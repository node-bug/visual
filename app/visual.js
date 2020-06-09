const fs = require('fs')
const { log } = require('@nodebug/logger')
const selenium = require('./selenium')

async function capture(driver, paths) {
    const image = selenium.takeScreenshot(driver);
    
    try{
        fs.writeFileSync(string, image, 'base64')
        log.info(`Screenshot saved at path ${string}`)
        return 'passed'
      } catch (err) {
        log.info(`Could not save screenshot at path ${string}`)
        log.error(err.stack)
        return 'error'
      }
}

module.exports = {
  capture,
}

// const compareImages = require('resemblejs/compareImages')
// const imagemin = require('imagemin')
// const imageminPngquant = require('imagemin-pngquant')
// const { log } = require('@nodebug/logger')

//     const paths = new Paths(path, testName)
//     const selectors = new Selectors(paths.folder)

//     const my = {}
//     my.driver = driver
//     my.testName = testName
//     my.filename = null
//     my.hidden = []

//     my.getFilename = async () => {
//       const browser = (await my.driver.getCapabilities()).getBrowserName()
//       const rect = await my.driver.manage().window().getRect()
//       const size = `${rect.width}x${rect.height}`
//       return `${browser}_${size}.png`
//     }

//     my.screenshot = async (string) => {
//       try {
//         await my.driver.wait(() =>
//           my.driver.executeScript('return document.readyState == "complete"'),
//         )
//         const image = (
//           await imagemin.buffer(
//             Buffer.from(await my.driver.takeScreenshot(), 'base64'),
//             {
//               plugins: [
//                 imageminPngquant({
//                   quality: [0.1, 0.4],
//                 }),
//               ],
//             },
//           )
//         ).toString('base64')
//         fs.writeFileSync(string, image, 'base64')
//         log.info(`Screenshot saved at path ${string}`)
//         return 'passed'
//       } catch (err) {
//         log.info(`Could not save screenshot at path ${string}`)
//         log.error(err.stack)
//         return 'error'
//       }
//     }

//     my.hideSelectors = async () => {
//       selectors.hideSelectors.forEach(async (selector) => {
//         const elements = await my.driver.findElements(getBy(selector))
//         elements.forEach((element) => {
//           my.hidden.push(element)
//           my.driver.executeScript('return arguments[0].style.opacity=0', element)
//         })
//       })
//       await my.driver.wait(() =>
//         my.driver.executeScript('return document.readyState == "complete"'),
//       )
//     }

//     my.unhideSelectors = async () => {
//       log.debug(`Unhiding all previously hidden elements on page.`)
//       my.hidden.forEach((element) => {
//         my.driver.executeScript('return arguments[0].style.opacity=1', element)
//       })
//       await my.driver.wait(() =>
//         my.driver.executeScript('return document.readyState == "complete"'),
//       )
//     }

//     my.capture = async (string) => {
//       log.debug(`Starting to hide elements on page before screenshot.`)
//       await my.hideSelectors()
//       await my.screenshot(string)
//       await my.unhideSelectors()
//     }

//     my.compare = async (e, a, d) => {
//       try {
//         await my.capture(a)
//         log.debug(`Comparing image at path ${e} with ${a}`)
//         const comp = await compareImages(e, a)
//         fs.writeFileSync(d, comp.getBuffer(), 'base64')
//         log.debug(`Comparison image ${my.filename} saved at path ${paths.diff}`)
//         if (comp.misMatchPercentage > 0.01) {
//           that.buffer = comp.getBuffer()
//           that.misMatchPercentage = comp.misMatchPercentage
//           log.info(
//             `Actual and expected images mismatch by ${comp.misMatchPercentage}%`,
//           )
//           return 'failed'
//         }
//         log.info('Actual and expected images match.')
//         return 'passed'
//       } catch (err) {
//         log.info(`Could not compare ${my.filename} screenshots due to error.`)
//         log.error(err.stack)
//         throw new Error(err.toString())
//       }
//     }

//     that.status = 'error'
//     that.misMatchPercentage = null
//     that.comparison = async () => {
//       my.filename = await my.getFilename()
//       that.existing = paths.folder + my.filename
//       log.debug(`Running ${mode} mode.`)
//       if (mode === 'capture') {
//         log.debug(`Capturing baseline screenshot.`)
//         await my.capture(that.existing)
//         log.debug(`Testing comparison to check valid baseline created.`)
//       }

//       if (!fs.existsSync(that.existing) && mode === 'compare') {
//         log.info(
//           `Baseline screenshot doesnt exist. Capturing baseline screenshot.`,
//         )
//         await my.capture(that.existing)
//       }

//       log.debug('Starting comparison.')
//       that.actual = paths.capture + my.filename
//       that.diff = paths.diff + my.filename
//       that.expected = paths.compare + my.filename
//       fs.copyFileSync(that.existing, that.expected)
//       that.status = await my.compare(that.expected, that.actual, that.diff)

//       return that.status
//     }

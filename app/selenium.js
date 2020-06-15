const { log } = require('@nodebug/logger')
const that = {}

function Driver(driver){
  const my = {}
  my.driver = driver;

  // that.browserName = async () => (await my.driver.getCapabilities()).getBrowserName()
  that.browserName = (async () => (await my.driver.getCapabilities()).getBrowserName())()
  
  that.size = (async () => {
    const rect = await my.driver.manage().window().getRect()
    return `${rect.width}x${rect.height}`
  })()

  that.takeScreenshot = async () => {
    try {
      await my.driver.wait(() =>
        my.driver.executeScript('return document.readyState == "complete"'),
      )
      // const image = (
      //   await imagemin.buffer(
      //     Buffer.from(await driver.takeScreenshot(), 'base64'),
      //     {
      //       plugins: [
      //         imageminPngquant({
      //           quality: [0.1, 0.4],
      //         }),
      //       ],
      //     },
      //   )
      // ).toString('base64');
      const image = await my.driver.takeScreenshot()
      return image
    } catch (err) {
      log.error(`Error while taking screenshot.`)
      log.error(err.stack)
      throw err
    }
  }

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

  return that
}

module.exports = Driver

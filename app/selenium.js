const { log } = require('@nodebug/logger')

function Driver(driver){
  const my = {}
  my.driver = driver;

  my.takeScreenshot = async () => {
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
      log.error(`Error while taking screenshot ${path}`)
      log.error(err.stack)
      throw err
    }
  }

  (async function metadata(){
      my.browser = (await my.driver.getCapabilities()).getBrowserName()
      my.rect = await my.driver.manage().window().getRect()
      my.size = `${rect.width}x${rect.height}`
  }())

}

module.exports = Driver

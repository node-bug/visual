const fs = require('fs')
const { log } = require('@nodebug/logger')

async function takeScreenshot(driver, path) {
  try {
    await driver.wait(() =>
      driver.executeScript('return document.readyState == "complete"'),
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
    const image = await driver.takeScreenshot()
    fs.writeFileSync(path, image, 'base64')
    log.info(`Screenshot saved at path ${path}`)
    return 'passed'
  } catch (err) {
    log.info(`Could not save screenshot at path ${path}`)
    log.error(err.stack)
    return 'error'
  }
}

module.exports = {
  takeScreenshot,
}

const { log } = require('@nodebug/logger')
const config = require('./app/config')
const Files = require('./app/files').Files
const visual = require('./app/visual')
const selenium = require('./app/selenium').Driver

log.debug(JSON.stringify(config))
const that = {};

function VisualObject(driver, path, name){
    const meta = new Driver(driver);
    const files = new Files(path, name);

    if(config.capture === true){
        that.status = visual.capture(driver, paths);
    }
    if(config.compare === true){

    }
}

module.exports = {
    VisualObject
}
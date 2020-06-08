const { log } = require('@nodebug/logger')
const config = require('./app/config')

log.debug(JSON.stringify(config))

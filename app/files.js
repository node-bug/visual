const path = require('path')
const fs = require('fs')
const config = require('./config')

function Files (folder, name) {
  const r = {}
  r.home = path.resolve(`${folder}/${name}`)

  if (config.compare) {
    r.capture = path.resolve(`./reports/visual/${name}/actual/`)
    r.compare = path.resolve(`./reports/visual/${name}/expected/`)
    r.diff = path.resolve(`./reports/visual/${name}/diff/`)
  }

  Object.values(r).forEach((string) => {
    if (!fs.existsSync(string)) {
      fs.mkdirSync(string, { recursive: true })
    }
  })

  return r
}

module.exports = {
  Files
}

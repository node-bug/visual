// const config = require('./app/config')
// const path = require('path');

// function paths(p, n) {
//   const r = {}
//   const home = p
//   const name = n.replace(/ /g, '_')
//   r.folder = path.resolve(`${home}/${name}/`)

//   if (config.compare) {
//     r.capture = path.resolve(`./reports/visual/${name}/actual/`)
//     r.compare = path.resolve(`./reports/visual/${name}/expected/`)
//     r.diff = path.resolve(`./reports/visual/${name}/diff/`)
//   }

//   Object.values(r).forEach((string) => {
//     if (!fs.existsSync(string)) {
//       fs.mkdirSync(string, { recursive: true })
//     }
//   })

//   return r
// }

// module.exports = {
//   paths
// }

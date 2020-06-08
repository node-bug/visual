// const { log } = require('@nodebug/logger')
// const { By } = require('selenium-webdriver')

// function getBy(element) {
//     let byReturn = null
//     const type = element.byType.toLowerCase().trim()
//     log.debug(
//       `Getting element ${element.name} By: ${type} for ${element.definition}`,
//     )
//     switch (type) {
//       case 'xpath':
//         byReturn = By.xpath(element.definition)
//         break
//       case 'css':
//         byReturn = By.css(element.definition)
//         break
//       case 'id':
//         byReturn = By.id(element.definition)
//         break
//       case 'name':
//         byReturn = By.name(element.definition)
//         break
//       case 'linktext':
//         byReturn = By.linkText(element.definition)
//         break
//       case 'classname':
//         byReturn = By.className(element.definition)
//         break
//       case 'partiallinktext':
//         byReturn = By.partialLinkText(element.definition)
//         break
//       case 'tagname':
//         byReturn = By.tagName(element.definition)
//         break
//       default:
//         // eslint-disable-next-line max-len
//         log.error(
//           `The data asked to identify the element ${element.name}  by the type ${element.byType} and that type is not valid.  Please review the data and try again.`,
//         )
//         log.error(
//           'Valid types are [xpath, cssSelector, id, name, linkText, partialLinkText, className, tagName]',
//         )
//     }
//     return byReturn
//   }

//   function Selectors(folder) {
//     const selectorFile = `${folder}/selectors.yaml`
//     const content = {
//       hideSelectors: [
//         {
//           name: 'Object Name for readability',
//           byType: 'css/class/xpath/id/or other selenium selectors',
//           definition: 'selenium selector',
//           frame: 'frame identifier if any',
//           specialInstr: 'NA',
//         },
//       ],
//     }
//     if (!fs.existsSync(selectorFile)) {
//       fs.writeFileSync(selectorFile, yaml.safeDump(content), 'utf8')
//     }

//     return yaml.safeLoad(fs.readFileSync(selectorFile, 'utf8'))
//   }

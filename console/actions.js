const { printUsage, printVersion } = require('./utilities')
const { setStandardLabels, deleteLabels } = require('../labels')

const defaultActionKey = 'default'

const actions = {
  h: printUsage,
  help: printUsage,
  v: printVersion,
  version: printVersion,
  d: deleteLabels,
  delete: deleteLabels,
  default: setStandardLabels
}

module.exports = {
  actions,
  defaultActionKey
}

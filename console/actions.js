const { printUsage, printVersion } = require('./utilities')
const { setStandardLabels, deleteLabels } = require('../labels')

const defaultActionKey = 'default'

const actions = {
  h: printUsage,
  v: printVersion,
  d: deleteLabels,
  default: setStandardLabels
}

module.exports = {
  actions,
  defaultActionKey
}

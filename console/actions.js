const { printUsage, printVersion } = require("./utilities")
const { setStandardLabels } = require("../labels")

const defaultActionKey = "default"

const actions = {
  h: printUsage,
  help: printUsage,
  v: printVersion,
  version: printVersion,
  default: setStandardLabels
}

const parseUserAction = (input, defaultKey) => {
  const entries = Object.entries(input)
  const availableActions = Object.keys(actions)
  const inputAction = entries.find(entry => {
    return availableActions.includes(entry[0]) && entry[1] === true
  })
  return typeof inputAction !== "undefined" ? inputAction[0] : defaultKey
}

module.exports = {
  actions,
  defaultActionKey,
  parseUserAction
}

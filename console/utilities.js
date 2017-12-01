const minimist = require('minimist')

const usage = `
  Usage:
    $ gitlab-standard-labels <project-id>
  Commands:
    <default>   Create a set of labels for a project
  Options:
    -d, --delete    Delete previous existing labels then Create new labels
    -h, --help      Print usage
    -v, --version   Print version
`

const { version } = require('../package.json')

const printUsage = () => { console.info(usage) }

const printVersion = () => { console.info(`v${version}`) }

const defaultArgsOptions = {
  boolean: [
    'delete',
    'version',
    'help'
  ]
}

const parseArgs = (args, options = defaultArgsOptions) => minimist(process.argv.slice(2), options)

const die = message => {
  console.error(message)
  process.exit(1)
}

const parseUserAction = (input, defaultKey) => {
  const entries = Object.entries(input)
  const inputAction = entries.find(entry => entry[1] === true)
  return typeof inputAction !== 'undefined' ? inputAction[0] : defaultKey
}

module.exports = {
  defaultArgsOptions,
  parseArgs,
  printUsage,
  printVersion,
  die,
  parseUserAction
}

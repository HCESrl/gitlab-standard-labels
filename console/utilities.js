const minimist = require('minimist')

const defaultArgsOptions = {
  boolean: [
    'delete', 'd',
    'version', 'v',
    'help', 'h'
  ]
}

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

const parseArgs = (args, options = defaultArgsOptions) => minimist(process.argv.slice(2), options)

const die = message => {
  console.error(message)
  process.exit(1)
}

module.exports = {
  printUsage,
  printVersion,
  parseArgs,
  die
}

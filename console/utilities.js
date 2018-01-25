const minimist = require('minimist')

const defaultArgsOptions = {
  string: ['token'],
  boolean: ['delete', 'board', 'version', 'help'],
  alias: {
    d: 'delete',
    b: 'board',
    v: 'version',
    h: 'help',
    t: 'token'
  }
}

const usage = `
  Usage:
    $ gitlab-standard-labels <repository-url>

  Commands:
    <default>   Create a set of labels for a project

  Parameters:
    repository-url  The complete URL to the repository (eg. https://gitlab.example.com/group/name)
    
  Options:
    -t, --token=    The authentication token, overwrites the token in the npm config, if defined
    -d, --delete    Delete previous existing labels and board lists before the creation
    -b, --board     Create default board lists
    -h, --help      Print usage
    -v, --version   Print version
`

const {version} = require('../package.json')

const printUsage = () => {
  console.info(usage)
}

const printVersion = () => {
  console.info(`v${version}`)
}

const parseArgs = (args, options = defaultArgsOptions) => {
  let parsed = minimist(args, options)
  parsed._ = parsed._.map(arg => arg.replace('\\', '/'))
  return parsed
}

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

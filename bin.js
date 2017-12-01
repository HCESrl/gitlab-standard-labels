#!/usr/bin/env node

let minimist = require('minimist')
let labels = require('./')

let argv = minimist(process.argv.slice(2), {
  boolean: [
    'delete',
    'version',
    'help'
  ]
})

let usage = `
  Usage:
    $ gitlab-standard-labels <project>
  Commands:
    <default>   Create a set of labels for a project
  Options:
    -d, --delete    Delete previous existing labels
    -h, --help      Print usage
    -v, --version   Print version
`

;(function main(argv) {
  if (argv.h) {
    return console.info(usage)
  } else if (argv.v) {
    return console.info('v' + require('./package.json').version)
  } else {
    let repository = argv._[0]
    if (!repository) {
      console.error('Project ID missing')
      process.exit(1)
    }
    labels.init(repository)
      .then(() => {
        if (argv.d) {
          console.info('Deleting all labels in ' + repository)
          labels.cleanUp()
            .then(create)
            .catch(console.error)
        } else {
          create()
        }

        function create() {
          labels.create()
            .then(() => {
              console.info('Labels successfully created in ' + repository)
            })
            .catch(console.error)
        }
      })
      .catch(console.error)
  }
})(argv)
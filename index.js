#!/usr/bin/env node

const { die, parseArgs } = require('./console/utilities')
const { actions, defaultActionKey, parseUserAction } = require('./console/actions')
const argv = parseArgs(process.argv.slice(2))

const main = async (input = argv) => {
  const action = parseUserAction(input, defaultActionKey)
  const requestedAction = actions[action]

  if (typeof requestedAction === 'undefined') return die('Not a valid action')

  try {
    const options = {
      delete: input.delete || input.d,
      board: input.board || input.b,
      token: typeof input.token !== 'undefined' ? input.token : null
    }
    const message = await requestedAction(input._, options)
    process.exit(0)
  } catch (error) {
    die(error)
  }
}

main()

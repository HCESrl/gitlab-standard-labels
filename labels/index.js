const {URL} = require("url")
const {labels, boards} = require("./actions")
const {setPrivateToken, setHost} = require("./api")
const {die} = require("../console/utilities")

const parseRepository = url => {
  if (typeof url === "undefined") die("Repository path is missing")

  const {origin, pathname} = new URL(url)

  setHost(origin)

  return pathname.replace(/^\//, "")
}


const validateCustomConfig = config => {
  const Validator = require("jsonschema").Validator

  let v = new Validator()
  let result = v.validate(config, require("../config/schema"))

  if (result.errors.length > 0) {
    throw new Error("Invalid custom configuration file")
  }
}


const setStandardLabels = async ([url], options) => {
  const repository = parseRepository(url)

  try {
    if (options.token !== null) {
      setPrivateToken(options.token)
    }

    // @todo allow relative path to current directory
    const config = (options.config !== null) ? require(options.config) : null

    if (config !== null) {
      validateCustomConfig(config)
    }

    const board = await boards.get(repository)

    if (options.delete) {
      if (options.board && board !== null) {
        console.info(`Deleting all board lists in repository ${repository}`)
        await boards.deleteLists(repository, board)
      }

      console.info(`Deleting all labels in repository ${repository}`)
      await labels.delete(repository)
    }

    console.info(`Creating all labels in repository ${repository}`)
    const responses = await labels.create(repository, config)

    if (options.board && board !== null) {
      console.info(`Creating default board lists in repository ${repository}`)
      await boards.createLists(repository, config, board, responses.map(response => response.data))
    }

    return responses
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  setStandardLabels
}

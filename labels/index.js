const {labels, boards} = require('./actions')
const {setPrivateToken} = require('./api')
const {die} = require('../console/utilities')

const setStandardLabels = async ([repository], options) => {
  if (typeof repository === 'undefined') die('Project ID/name is missing')

  try {
    if (options.token !== null) {
      setPrivateToken(options.token)
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
    const responses = await labels.create(repository)

    if (options.board && board !== null) {
      console.info(`Creating default board lists in repository ${repository}`)
      await boards.createLists(repository, board, responses.map(response => response.data))
    }
    
    return responses
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  setStandardLabels
}

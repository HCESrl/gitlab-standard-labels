const {deleteLabels, createLabels, getBoard, deleteBoardLists, createBoardLists} = require('./actions')
const { setPrivateToken } = require('./api')
const {die} = require('../console/utilities')

const setStandardLabels = async ([repository], options) => {
  if (typeof repository === 'undefined') die('Project ID/name is missing')

  try {
    if (options.token !== null) {
      setPrivateToken(options.token)
    }

    if (typeof options.board !== 'undefined' && options.board) {
      const board = await getBoard(repository)
    }
    
    if (typeof options.delete !== 'undefined' && options.delete) {
      if (typeof options.board !== 'undefined' && options.board && typeof board !== 'undefined' && board !== null) {
        console.info(`Deleting all board lists in repository ${repository}`)
        const deleteListsResult = await deleteBoardLists(repository, board)
      }

      console.info(`Deleting all labels in repository ${repository}`)
      const cleanUpResult = await deleteLabels(repository)
    }

    console.info(`Creating all labels in repository ${repository}`)
    const responses = await createLabels(repository)

    if (typeof options.board !== 'undefined' && options.board && typeof board !== 'undefined' && board !== null) {
      console.info(`Creating default board lists in repository ${repository}`)
      return createBoardLists(repository, board, responses.map(response => response.data))
    }
    return responses
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  setStandardLabels
}

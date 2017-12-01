const {cleanUp, create} = require('./actions')
const {die} = require('../console/utilities')

const setStandardLabels = async ([repository], cleanFirst = false) => {
  if (typeof repository === 'undefined') die('Project ID/name is missing')

  try {
    if (cleanFirst) {
      console.info(`Deleting all labels in ${repository}`)
      const cleanUpResult = await cleanUp(repository)
    }

    console.info(`Creating all labels in ${repository}`)
    return create(repository)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  setStandardLabels
}

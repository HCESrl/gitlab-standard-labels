const { cleanUp, create } = require('./actions')
const { die } = require('../console/utilities')

const setStandardLabels = async ([repository]) => {
  if (typeof repository === 'undefined') die('Project ID/name is missing')

  console.info(`Creating all labels in ${repository}`)

  try {
    return create(repository)
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteLabels = async ([repository]) => {
  if (typeof repository === 'undefined') die('Project ID/name is missing')

  console.info(`Deleting all labels in ${repository}`)

  try {
    const cleanUpResult = await cleanUp(repository)
    const createResult = await setStandardLabels([repository])
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  setStandardLabels,
  deleteLabels
}

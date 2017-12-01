const { labels } = require('../config')
const { getEntryPoint } = require('./api')
const axios = require('axios')

const getAll = async repository => {
  const entry = getEntryPoint('labels', repository)

  try {
    const labels = await axios.get(entry)
    return typeof labels.data !== 'undefined' ? labels.data : []
  } catch (error) {
    throw new Error(error.message)
  }
}

const create = async repository => Promise.all(
  labels.map(label => axios.post(getEntryPoint('labels', repository), label))
)

const cleanUp = async repository => {
  const entry = getEntryPoint('labels', repository)

  try {
    const onlineLabels = await getAll(repository)
    const labelsDeleteActionsUrl = onlineLabels.map(label => `${entry}?name=${label.name}`)
    return Promise.all(labelsDeleteActionsUrl.map(axios.delete))
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  create,
  cleanUp
}

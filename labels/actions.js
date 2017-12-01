const { host, labels, token } = require('../config')
const { die } = require('../console/utilities')
const axios = require('axios')

axios.defaults.headers.common['PRIVATE-TOKEN'] = token

const apiUrl = `${host}/api/v4/projects/`

const getLabelEntryPoint = (repository, base = apiUrl) => `${base + repository}/labels`

const getAll = async repository => {
  const encodedRepository = encodeURIComponent(repository)
  const entry = getLabelEntryPoint(encodedRepository)

  try {
    const labels = await axios.get(entry)
    return typeof labels.data !== 'undefined' ? labels.data : []
  } catch (error) {
    throw new Error(error.message)
  }
}

const create = async repository => Promise.all(
  labels.map(label => axios.post(getLabelEntryPoint(repository), label))
)

const cleanUp = async repository => {
  const entry = getLabelEntryPoint(repository)

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

const { host, labels, token } = require('../config')
const axios = require('axios')

const apiUrl = `${host}/api/v4/projects/`

const getEntryPoint = (name, repository, base = apiUrl) => {
  const encodedRepository = encodeURIComponent(repository)
  return `${base + repository}/${name}`
}

const setPrivateToken = token => {
  axios.defaults.headers.common['PRIVATE-TOKEN'] = token
}
setPrivateToken(token)

module.exports = {
  setPrivateToken,
  getEntryPoint
}

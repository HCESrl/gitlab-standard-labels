const axios = require("axios")
const config = require("npm-conf")();

const apiPath = "/api/v4/projects/"

const getEntryPoint = (name, repository, basePath = apiPath) => {
  const base = getHost() + basePath
  const encodedRepository = encodeURIComponent(repository)
  return `${base + encodedRepository}/${name}`
}

const setHost = host => {
  config.set("gitlab-standard-labels.host", host)
}

const getHost = () => config.get("gitlab-standard-labels.host")

const setPrivateToken = token => {
  axios.defaults.headers.common["PRIVATE-TOKEN"] = token
}
setPrivateToken(config.get("gitlab-standard-labels.token"))

module.exports = {
  setPrivateToken,
  setHost,
  getEntryPoint
}

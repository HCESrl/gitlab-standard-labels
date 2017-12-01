const config = require('../config.json')
let axios = require('axios')

axios.defaults.headers.common['PRIVATE-TOKEN'] = config.token

/**
 * @todo repository as namespace/repository not working
 */
let gitlabStandardLabels = {
  uri: null,

  init(repository) {
    return new Promise((resolve, reject) => {
      repository = typeof repository === 'number' ? repository : encodeURIComponent(repository)
      gitlabStandardLabels.uri = config.host + '/api/v4/projects/' + repository + '/labels'
      resolve()
    })
  },

  cleanUp() {
    return new Promise((resolve, reject) => {
      getAll()
        .then(labels => {
          labels.forEach(label => {
            axios.delete(gitlabStandardLabels.uri + '&name=' + label.name)
              .catch(reject)
          })
          resolve()
        })
        .catch(reject)
    })
  },

  create() {
    return new Promise((resolve, reject) => {
      config.labels.forEach(label => {
        axios.post(gitlabStandardLabels.uri, label)
          .catch(reject)
      })
      resolve()
    })
  }
}

function getAll() {
  return new Promise((resolve, reject) => {
    axios.get(gitlabStandardLabels.uri)
      .then(response => {
        resolve(typeof response.data !== 'undefined' ? response.data : [])
      })
      .catch(reject)
  })
}

module.exports = gitlabStandardLabels

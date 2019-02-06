const defaultLabels = require("../config/default")
const {getEntryPoint} = require("./api")
const axios = require("axios")

const boardsApi = {
  get: async repository => {
    const entry = getEntryPoint("boards", repository)

    try {
      const boards = await axios.get(entry)
      if (typeof boards.data === "undefined" || boards.data.length === 0) {
        console.warn("No default board found. Please visit the board page in order to trigger the default GitLab board creation. Hopefully one day this is gonna be fixed by the GitLab team...")
        return null
      }
      return boards.data[0]
    } catch (error) {
      throw new Error(error.message)
    }
  },
  deleteLists: async (repository, board) => {
    const entry = getEntryPoint(`boards/${board.id}/lists`, repository)
    const listsDeleteActionsUrl = board.lists.map(list => `${entry}/${list.id}`)

    try {
      return Promise.all(listsDeleteActionsUrl.map(axios.delete))
    } catch (error) {
      throw new Error(error.message)
    }
  },
  createLists: async (repository, config, board, createdLabels) => {
    const entry = getEntryPoint(`boards/${board.id}/lists`, repository)

    const labels = config !== null ? config : defaultLabels
    const boardLabels = labels.filter(label => label.board === true)

    const listsCreateActionsUrl = boardLabels.reverse().map(boardLabel => {
      const label = createdLabels.find(label => label.name === boardLabel.name)
      return `${entry}?label_id=${label.id}`
    })

    try {
      return Promise.all(listsCreateActionsUrl.map(url => axios.post(url)))
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

const labelsApi = {
  get: async repository => {
    const entry = getEntryPoint("labels", repository)

    try {
      const onlineLabels = await axios.get(entry)
      return typeof onlineLabels.data !== "undefined" ? onlineLabels.data : []
    } catch (error) {
      throw new Error(error.message)
    }
  },
  create: async (repository, config) => {
    const labels = config !== null ? config : defaultLabels
    return Promise.all(
      labels.map(label => axios.post(getEntryPoint("labels", repository), label))
    )
  },
  delete: async repository => {
    const entry = getEntryPoint("labels", repository)

    try {
      const onlineLabels = await labelsApi.get(repository)
      const labelsDeleteActionsUrl = onlineLabels.map(label => `${entry}?name=${label.name}`)
      return Promise.all(labelsDeleteActionsUrl.map(axios.delete))
    } catch (error) {
      throw new Error(error.message)
    }
  }
}


module.exports = {
  labels: labelsApi,
  boards: boardsApi
}
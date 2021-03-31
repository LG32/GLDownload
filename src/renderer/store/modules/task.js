import api from '../../../renderer/api/index.js'
import {DOWNLOAD_URL} from '../../../utils'

const state = {
    currentList: 'active',
    taskItemInfoVisible: false,
    currentTaskItem: null,
    seedingList: [],
    taskObj: false,
    selectedGidList: []
}

const getters = {}

const mutations = {
    UPDATE_TASK_OBJ (state, taskObj) {
        state.taskObj = taskObj
    },
}

const actions = {
    fetchList({commit, state}) {
        return api.fetchTaskList({type: state.currentList})
            .then((data) => {
                commit('UPDATE_TASK_OBJ', data)
            })
    },
    addUri({dispatch}, filePath) {
        const uris = [DOWNLOAD_URL]
        let options = {}
        options.dir = filePath
        options.split = 64
        let outs = {}

        return api.addUri({uris, outs, options})
            .then(() => {
                dispatch('fetchList')
            })
    },
    addTorrent({dispatch}, data) {
        const {torrent, options} = data
        return api.addTorrent({torrent, options})
            .then(() => {
                dispatch('fetchList')
            })
    },
    getTaskOption(_, gid) {
        return new Promise((resolve) => {
            api.getOption({gid})
                .then((data) => {
                    resolve(data)
                })
        })
    },
    pauseTask({dispatch}, gid) {
        return api.pauseTask({gid})
            .catch(() => {
                return api.forcePauseTask({gid})
            })
            .finally(() => {
                dispatch('fetchList')
                dispatch('saveSession')
            })
    },
    resumeTask({dispatch}, gid) {
        return api.resumeTask({gid})
            .finally(() => {
                dispatch('fetchList')
                dispatch('saveSession')
            })
    },
    removeTask ({ dispatch }, gid) {
        return api.removeTask({ gid })
            .finally(() => {
                dispatch('fetchList')
                dispatch('saveSession')
            })
    },
    saveSession() {
        api.saveSession()
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

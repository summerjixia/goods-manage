import modules from "./module"

const state = {
    user: {}
}

const mutations = {
    ADD_USER: (state, payload) => {
        state.user = payload
    },
    DELETE_USER: (state, payload) => {
        state.user = {}
    },
}
export default {
    state, mutations,modules
}
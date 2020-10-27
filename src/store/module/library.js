let state = {
    library: {}
}

let mutations = {
    ADD_LIBRARY: (state, payload) => {
        // state.library[payload.code].push(payload)
        state.library = payload
    },
    DELETE_LIBRARY: (state, payload) => {
        // let index = state.library[payload.code].indexOf(payload);
        // state.library[payload.code].splice(index, 1);
        state.library = {}
    },
}

export default {
    namespaced: true,
    state: () => state, mutations
}
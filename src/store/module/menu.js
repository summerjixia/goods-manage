let state = {
    menu: []
}

let mutations = {
    ADD_MENU: (state, payload) => {
        state.menu = payload
    },
    DELETE_MENU: (state, payload) => {
        let index = state.menu.indexOf(payload);
        state.menu.splice(index, 1);
        state.menu = [...state.menu]
    },
}

export default {
    namespaced: true,
    state: () => state, mutations
}
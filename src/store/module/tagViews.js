let state = {
    openView: [],
    cacheView: []
}

let mutations = {
    ADD_OPENVIEW: (state, payload) => {
        let isNew = true;
        state.openView.forEach((item) => {
            item.flag = false;
            if (item.route === payload.route) {
                item.flag = true;
                isNew = false;
            }
        })
        if (isNew) {
            state.openView = [...state.openView, payload]
        } else {
            state.openView = [...state.openView]
        }
    },
    ADD_CACHEVIEW: (state, payload) => {
        let isNew = true;
        state.cacheView.forEach((item) => {
            if (item === payload.route.substr(1)) {
                isNew = false;
            }
        })
        if (isNew) {
            state.cacheView = [...state.cacheView, payload.route.substr(1)]
        } else {
            state.cacheView = [...state.cacheView]
        }
    },
    DELETE_OPENVIEW: (state, payload) => {
        if (state.openView.length === 1) return;
        let index = state.openView.indexOf(payload);
        state.openView.splice(index, 1);
        state.openView[state.openView.length - 1].flag = true;
        state.openView = [...state.openView];
    },
    DELETE_CACHEVIEW: (state, payload) => {
        if (state.cacheView.length === 1) return;
        let index = state.cacheView.indexOf(payload.route.substr(1));
        state.cacheView.splice(index, 1);
        state.cacheView = [...state.cacheView]
    },
    UPDATE_OPENVIEW: (state, payload) => {
        state.openView.forEach((item) => {
            item.flag = false;
        })
        let index = state.openView.indexOf(payload);
        state.openView[index].flag = true;
        state.openView = [...state.openView]
    },
    UPDATE_CACHEVIEW: (state, payload) => {
        // state.cacheView.forEach((item) => {
        //     item.flag = false;
        // })
        // let index = state.cacheView.indexOf(payload);
        // state.cacheView[index].flag = true;
        // state.cacheView = [...state.cacheView]
    },
}

let actions = {
    addOpenView: ({ commit }, payload) => {
        commit("ADD_OPENVIEW", payload);
        commit("ADD_CACHEVIEW", payload);
    },
    updateCacheView: ({ commit }, payload) => {
        commit("UPDATE_CACHEVIEW", payload);
    },
    deleteOpenView: ({ commit }, payload) => {
        commit("DELETE_OPENVIEW", payload);
        commit("DELETE_CACHEVIEW", payload);
    }
}

export default {
    namespaced: true,
    state: () => state, mutations, actions
}
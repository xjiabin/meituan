const state = () => ({
    position: {}
});

const mutations = {
    setPositon(state, val) {
        state.position = val;
    }
}

const actions = {
    setPOsiton({ commit }, position = {}) {
        commit('setPositon', position);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

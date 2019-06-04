export const state = () => ({
  states: []
})

export const getters = {
  getallstate(state) {
    return state.states
  },
  getbyid(state, id) {
    return state.states.filter(states => states.id === id)
  }
}



export const actions = {
  SetState({
    commit
  }) {
    this.$axios.$get("/indexstate").then((response) => {
      let states = response.data;
      commit("SET_COUNTRIES", states)
    })
  }
}



export const mutations = {
  SET_COUNTRIES(state, states) {
    state.states = states;
  }
}

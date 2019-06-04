export const state = () => ({
  status: false,
  role: null
})

export const getters = {
  getmodalstatus(state) {
    return state.status;
  },
  getrolestatus(status) {
    return state.role;
  }
}



export const actions = {
  SetStatus({
    commit
  }, status) {
    commit("ChangeStatus", status)
  }
}



export const mutations = {
  SetStatus(state, status) {
    state.status = staus;
    console.log('working');
  }
}

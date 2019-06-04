//state
export const state = () => ({
  scheme: []

})


//getters
export const getters = {

  getallscheme(state) {
    return state.scheme;
  }
}


export const actions = {
  getallschemes({
    commit
  }) {
    this.$axios.$get("/indexscheme")
      .then((response) => {
        commit("SET_SCHEME", response.data)
      })
  },
  addnewscheme({
    commit
  }, form) {
    this.$axios.$post("/createscheme", form)
      .then((response) => {
        commit("ADD_SCHEME", response.data)
      })
  },
  deletescheme({
    commit
  }, id) {
    this.$axios.$delete("/scheme/" + id).
    then((response) => {
      commit("DELETE_SCHEME", id)
    })
  },
  updatescheme({
    commit
  }, form) {
    this.$axios.$post("/editscheme", form)
      .then((response) => {
        commit("UPDATE_SCHEME", {
          form,
          data: response.data
        })
      })
  }
}


export const mutations = {

  SET_SCHEME(state, data) {
    state.scheme = data;
  },
  ADD_SCHEME(state, data) {
    state.scheme.unshift(data);
  },
  DELETE_SCHEME(state, id) {
    state.scheme = state.scheme.filter(
      scheme => scheme.id !== id
    );

  },
  UPDATE_SCHEME(state, payload) {
    let scheme = state.scheme.filter(
      scheme => scheme.id === payload.data.id
    );
    let index = state.scheme.indexOf(scheme[0]);
    const newArray = Object.assign([], state.scheme, {
      [index]: payload.data
    });
    state.scheme = newArray;
  }
}

export const state = () => ({
  river: []
})


export const getters = {
  getallrivers(state) {
    return state.river;
  },
  getriver: (state) => (id) => {
    return state.river.filter(rivers => rivers.id === 2)
  }
}

export const actions = {
  AllRiver({
    commit
  }) {
    this.$axios.$get("/indexriver")
      .then((response) => {
        commit("ALL_RIVER", response)
      })
  },
  AddRiver({
    commit
  }, form) {
    this.$axios.$post("/createriver", form)
      .then((response) => {
        commit("ADD_RIVER", response)
      })


  },
  Deleteriver({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/river/" + id).then((response) => {
        let river = response.data;

        commit("REMOVE_DELETEDRIVER", river.id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  updateriver({
    commit
  }, form) {
    this.$axios.$post("/editriver", form)
      .then((response) => {
        commit("UPDATE_RIVER", {
          form,
          data: response.data
        })
      })
  }
}

export const mutations = {
  ADD_RIVER(state, response) {
    state.river.push(response.data);

  },
  ALL_RIVER(state, response) {
    state.river = response.data
  },
  REMOVE_DELETEDRIVER(state, id) { //removing deleted from state
    state.river = state.river.filter(
      river => river.id !== id
    );

  },
  UPDATE_RIVER(state, payload) {
    let river = state.river.filter(
      river => river.id === payload.data.id
    );
    let index = state.river.indexOf(river[0]);
    const newArray = Object.assign([], state.river, {
      [index]: payload.data
    });
    state.river = newArray;
  }
}

//state
export const state = () => ({
  distribution: []
})


//endstate





//getters
export const getters = {

  getalldistribution(state) {
    return state.distribution
  },
  findById: (state) => (id) => {
    return state.distribution.filter(distribution => distribution.id === id)
  }
}


//endgetters


//actions
export const actions = {
  Loaddistribution({
    commit
  }) { //Load distribution from server
    this.$axios.$get("/indexdistrubution")
      .then(response => {
        let distribution = response.data

        commit("SET_distribution", distribution)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  Adddistribution({
    commit
  }, payload) { //Add distribution from form

    this.$axios.$post("/createdistrubution", payload).then((response) => {
        let distribution = response.data;
        commit("SET_NEWdistribution", distribution)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  Deletedistribution({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/distrubution/" + id).then((response) => {
        let distribution = response.data;

        commit("REMOVE_DELETEDdistribution", distribution.id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  updatedistribution({
    commit
  }, form) {
    this.$axios.$post("/editdistrubution", form)
      .then((response) => {
        commit("UPDATE_DISTRIBUTION", form, response.data)
      })
  }


}

//endactions









//mutations
export const mutations = {
  SET_distribution(state, distribution) { //Set distribution in state from server
    state.distribution = distribution
  },
  SET_NEWdistribution(state, distribution) { // set distribution in state.distribution array
    state.distribution.unshift(distribution);
  },
  editdistribution(state, distribution) {

  },
  REMOVE_DELETEDdistribution(state, id) { //removing deleted from state
    state.distribution = state.distribution.filter(
      distribution => distribution.id !== id
    );

  },
  UPDATE_DISTRIBUTION(state, form, data) {
    let index = state.distribution.indexOf(form)
    state.distribution[index] = data
  }


}

//endmutations

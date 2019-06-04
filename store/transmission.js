//state
export const state = () => ({
  transmission: []
})
//getters
export const getters = {

  getalltransmission(state) {
    return state.transmission
  },
  findById: (state) => (id) => {
    return state.transmission.filter(transmission => transmission.id === id)
  }
}

//actions
export const actions = {
  Loadtransmission({
    commit
  }) { //Load transmission from server
    this.$axios.$get("/indextransmission")
      .then(response => {
        let transmission = response.data

        commit("SET_transmission", transmission)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  Addtransmission({
    commit
  }, payload) { //Add hydropower from form

    this.$axios.$post("/createtransmission", payload).then((response) => {
        let transmission = response.data;
        commit("SET_NEwtransmission", transmission)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  Updatetransmission({
    commit
  }, form) {
    this.$axios.$post("/edittransmission", form)
      .then((response) => {
        commit("UPDATE_Transmission", form, response.data)
      })
  },
  Deletetransmission({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/transmission/" + id).then((response) => {
        let transmission = response.data;

        commit("REMOVE_DELETEDTRANSMISSION", transmission.id)
      })
      .catch((error) => {
        console.log(error);
      })

  }


}
//mutations
export const mutations = {
  SET_transmission(state, transmission) { //Set transmission in state from server
    state.transmission = transmission
  },
  SET_NEwtransmission(state, transmission) { // set hydropower in state.hydropower array
    state.transmission.unshift(transmission);
  },
  UPDATE_Transmission(state, form, data) {
    let index = state.transmission.indexOf(form)

    state.transmission[index] = data
  },
  REMOVE_DELETEDTRANSMISSION(state, id) { //removing deleted from state
    state.transmission = state.transmission.filter(
      transmission => transmission.id !== id
    )
  },

}

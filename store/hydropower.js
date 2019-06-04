//state
export const state = () => ({
  hydropower: []
})

//getters
export const getters = {

  getallhydropower(state) {
    return state.hydropower
  },
  findById: (state) => (id) => {
    return state.hydropower.filter(hydropower => hydropower.id === id)
  }
}
//end getters

//actions
export const actions = {



  Loadhydropower({
    commit
  }) { //Load hydropower from server
    this.$axios.$get("/indexhydropower")
      .then(response => {
        let hydropower = response.data

        commit("SET_hydropower", hydropower)
      })
      .catch((error) => {
        console.log(error);
      })
  },




  Addhydropower({
    commit
  }, payload) { //Add hydropower from form

    this.$axios.$post("/createhydropower", payload).then((response) => {
        let hydro = response.data;
        commit("SET_NEWhydropower", hydro)
      })
      .catch((error) => {
        console.log(error);
      })

  },





  Updatehydropower({
    commit
  }, form) {
    this.$axios.$post("/edithydropower", form)
      .then((response) => {
        commit("UPDATE_HYDROPOWER", form, response.data)
      })
  },


  Deletehydropower({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/hydropower/" + id).then((response) => {
        let hydropower = response.data;

        commit("REMOVE_DELETEDHYDROPOWER", hydropower.id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
}
















//mutations
export const mutations = {
  SET_hydropower(state, hydropower) { //Set hydropower in state from server
    state.hydropower = hydropower
  },
  SET_NEWhydropower(state, hydropower) { // set hydropower in state.hydropower array
    state.hydropower.unshift(hydropower);
  },
  REMOVE_DELETEDHYDROPOWER(state, id) { //removing deleted from state
    state.hydropower = state.hydropower.filter(
      hydropower => hydropower.id !== id
    )
  },
  UPDATE_HYDROPOWER(state, form, data) {
    let index = state.hydropower.indexOf(form)

    state.hydropower[index] = data
  }
}

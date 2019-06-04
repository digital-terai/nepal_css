//state
export const state = () => ({
  license: []
})


//endstate





//getters
export const getters = {

  getalllicense(state) {
    return state.license
  },
  findById: (state) => (id) => {
    return state.license.filter(license => license.id === 1)
  }
}


//endgetters


//actions
export const actions = {
  Loadlicense({
    commit
  }) { //Load license from server
    this.$axios.$get("/indexlicense")
      .then(response => {
        let license = response.data

        commit("SET_license", license)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  Addlicense({
    commit
  }, payload) { //Add license from form
    this.$axios.$post("/createlicense", payload).then((response) => {
        let license = response.data;
        commit("SET_NEWlicense", license)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  Deletelicense({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/license/" + id).then((response) => {
        let license = response.data;

        commit("REMOVE_DELETEDlicense", license.id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  updatelicense({
    commit
  }, form) {

    this.$axios.$post("/editlicense", form)
      .then((response) => {
        commit("UPDATE_LICENSE", {
          form,
          data: response.data
        })
      })
  }

}

//endactions









//mutations
export const mutations = {
  SET_license(state, license) { //Set license in state from server
    state.license = license
  },
  SET_NEWlicense(state, license) { // set license in state.license array
    state.license.unshift(license);
  },
  editlicense(state, license) {

  },
  REMOVE_DELETEDlicense(state, id) { //removing deleted from state
    state.license = state.license.filter(
      license => license.id !== id
    );

  },
  UPDATE_LICENSE(state, payload) {
    let license = state.license.filter(
      license => license.id === payload.data.id
    );
    let index = state.license.indexOf(license[0]);
    const newArray = Object.assign([], state.license, {
      [index]: payload.data
    });
    state.license = newArray;
  }


}

//endmutations

//state
export const state = () => ({
  assignmenttask: []
})


//endstate





//getters
export const getters = {

  getallassignmenttask(state) {
    return state.assignmenttask
  },
  findById: (state) => (id) => {
    return state.assignmenttask.filter(assignmenttask => assignmenttask.id === 1)
  }
}


//endgetters


//actions
export const actions = {
  Loadassignmenttask({
    commit
  }) { //Load assignmenttask from server
    this.$axios.$get("/indextaskdetail")
      .then(response => {
        let assignmenttask = response.data

        commit("SET_assignmenttask", assignmenttask)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  Addassignmenttask({
    commit
  }, payload) { //Add assignmenttask from form
    this.$axios.$post("/createtaskdetail", payload).then((response) => {
        let assignmenttask = response.data;
        commit("SET_NEWassignmenttask", assignmenttask)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  Deleteassignmenttask({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/taskdetail/" + id).then((response) => {
        let assignmenttask = response.data;

        commit("REMOVE_DELETEDassignmenttask", assignmenttask.id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  updateassignmenttask({
    commit
  }, form) {

    this.$axios.$post("/edittaskdetail", form)
      .then((response) => {
        commit("UPDATE_ASSIGNMENTTASK", {
          form,
          data: response.data
        })
      })
  }


}

//endactions









//mutations
export const mutations = {
  SET_assignmenttask(state, assignmenttask) { //Set assignmenttask in state from server
    state.assignmenttask = assignmenttask
  },
  SET_NEWassignmenttask(state, assignmenttask) { // set assignmenttask in state.assignmenttask array
    state.assignmenttask.unshift(assignmenttask);
  },
  editassignmenttask(state, assignmenttask) {

  },

  REMOVE_DELETEDassignmenttask(state, id) { //removing deleted from state
    state.assignmenttask = state.assignmenttask.filter(
      assignmenttask => assignmenttask.id !== id
    );

  },
  UPDATE_ASSIGNMENTTASK(state, payload) {

    let assignmenttask = state.assignmenttask.filter(
      assignmenttask => assignmenttask.id === payload.data.id
    );
    let index = state.assignmenttask.indexOf(assignmenttask[0]);
    const newArray = Object.assign([], state.assignmenttask, {
      [index]: payload.data
    });
    state.assignmenttask = newArray;
  }


}

//endmutations

export const state = () => ({
  stage: []
})


export const getters = {
  getstage(state) {
    return state.stage
  }
}


export const actions = {
  getstages({
    commit
  }) {
    this.$axios.$get("/indexstage").
    then((response) => {


      commit("GET_STAGES", response.data)
    })


  },
  addnewstage({
    commit
  }, form) {
    this.$axios.$post("/createstage", form).
    then((response) => {
      let stage = response.data;
      commit("ADD_NEWSTAGE", stage)
    })
  },
  deletestage({
    commit
  }, id) {
    this.$axios.$delete("/stage/" + id).then((response) => {
      commit("DELETE_STAGE", id)
    })
  },
  updatestage({
    commit
  }, form) {

    this.$axios.$post("/editstage", form)
      .then((response) => {
        commit("UPDATE_STAGE", {
          form,
          data: response.data
        })
      })
  }
}


export const mutations = {
  GET_STAGES(state, data) {

    state.stage = data;

  },
  ADD_NEWSTAGE(state, data) {
    state.stage.unshift(data);
  },
  DELETE_STAGE(state, id) {
    state.stage = state.stage.filter(state => state.id !== id)
  },
  UPDATE_STAGE(state, payload) {
    let stage = state.stage.filter(
      stage => stage.id === payload.data.id
    );
    let index = state.stage.indexOf(stage[0]);
    const newArray = Object.assign([], state.stage, {
      [index]: payload.data
    });
    state.stage = newArray;
  }
}

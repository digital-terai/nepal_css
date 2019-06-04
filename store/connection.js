export const state = () => ({
  connection: []
})

export const getters = {
  getallconnection(state) {
    return state.connection
  },
  getbyid(state, id) {
    return state.connection.filter(connection => connection.id === id)
  }
}



export const actions = {
  SetConnection({
    commit
  }) {
    this.$axios.$get("/indexconnectiontype").then((response) => {
      let connection = response.data;
      commit("SET_CONNECTION", connection)
    })
  },
  AddConnection({
    commit
  }, form) {
    this.$axios.$post("/createconnectiontype", form)
      .then((response) => {
        commit("ADD_CONNECTION", response.data)
      })


  },
  DeleteConnection({
    commit
  }, id) {
    this.$axios.$delete("/connectiontype/" + id).then((response) => {

        commit("REMOVE_DELETEDCONNECTION", id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  updateconnection({
    commit
  }, form) {

    this.$axios.$post("/editconnectiontype", form)
      .then((response) => {
        commit("UPDATE_CONNECTION", {
          form,
          data: response.data
        })
      })
  }
}



export const mutations = {
  SET_CONNECTION(state, connection) {
    state.connection = connection;
  },
  ADD_CONNECTION(state, data) {
    state.connection.unshift(data)
  },
  REMOVE_DELETEDCONNECTION(state, id) {
    state.connection = state.connection.filter(
      connection => connection.id !== id
    );
  },
  UPDATE_CONNECTION(state, payload) {
    let connection = state.connection.filter(
      connection => connection.id === payload.data.id
    );
    let index = state.connection.indexOf(connection[0]);
    const newArray = Object.assign([], state.connection, {
      [index]: payload.data
    });
    state.connection = newArray;
  }
}

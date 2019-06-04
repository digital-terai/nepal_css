export const state = () => ({
  city: []
})

export const getters = {
  getallcity(state) {
    return state.city
  },
  getbyid(state, id) {
    return state.city.filter(citys => citys.id === id)
  }
}



export const actions = {
  SetCity({
    commit
  }) {
    this.$axios.$get("/indexcity").then((response) => {
      let city = response.data;
      commit("SET_city", city)
    })
  }
}



export const mutations = {
  SET_city(state, city) {
    state.city = city;
  }
}

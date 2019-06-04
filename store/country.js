export const state = () => ({
  country: []
})

export const getters = {
  getallcountry(state) {
    return state.country
  },
  getbyid(state, id) {
    return state.country.filter(country => country.id === id)
  }
}



export const actions = {
  SetCountry({
    commit
  }) {
    this.$axios.$get("/indexcountry").then((response) => {
      let countries = response.data;
      commit("SET_COUNTRIES", countries)
    })
  }
}



export const mutations = {
  SET_COUNTRIES(state, countries) {
    state.country = countries;
  }
}

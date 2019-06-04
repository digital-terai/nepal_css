export const state = () => ({
  district: []
})

export const getters = {
  getalldistrict(state) {
    return state.district
  },
  getbyid(state, id) {
    return state.district.filter(districts => districts.id === id)
  }
}



export const actions = {
  SetDistrict({
    commit
  }) {
    this.$axios.$get("/indexdistrict").then((response) => {
      let district = response.data;
      commit("SET_DISTRICT", district)
    })
  }
}



export const mutations = {
  SET_DISTRICT(state, district) {
    state.district = district;
  }
}

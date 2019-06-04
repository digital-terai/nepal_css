//state
export const state = () => ({
  categories: []
})


//endstate





//getters
export const getters = {

  getallcategory(state) {
    return state.categories
  },
  findById: (state) => (id) => {
    return state.categories.filter(category => category.id === 1)
  }
}


//endgetters


//actions
export const actions = {
  LoadCategory({
    commit
  }) { //Load categories from server
    this.$axios.$get("/indexcategory")
      .then(response => {
        let categories = response.data

        commit("SET_CATEGORY", categories)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  AddCategory({
    commit
  }, payload) { //Add category from form
    this.$axios.$post("/createcategory", payload).then((response) => {
        let category = response.data;
        commit("SET_NEWCATEGORY", category)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  Deletecategory({
    commit
  }, id) { //delete from server
    this.$axios.$delete("/category/" + id).then((response) => {
        let category = response.data;

        commit("REMOVE_DELETEDCATEGORY", category.id)
      })
      .catch((error) => {
        console.log(error);
      })

  },
  updatecategory({
    commit
  }, form) {

    this.$axios.$post("/editcategory", form)
      .then((response) => {

        commit("UPDATE_CATEGORY", {
          form,
          data: response.data
        })
      })
  },
  findCategory({
    commit
  }, payload) {
    commit('FIND_CATEGORY', payload);
  }
}

//endactions









//mutations
export const mutations = {
  SET_CATEGORY(state, categories) { //Set categories in state from server
    state.categories = categories
  },
  SET_NEWCATEGORY(state, category) { // set categories in state.categories array
    state.categories.unshift(category);
  },
  editCategory(state, categories) {

  },
  REMOVE_DELETEDCATEGORY(state, id) { //removing deleted from state
    state.categories = state.categories.filter(
      category => category.id !== id
    );

  },
  UPDATE_CATEGORY(state, payload) {
    let category = state.categories.filter(
      category => category.id === payload.data.id
    );
    let index = state.categories.indexOf(category[0]);
    const newArray = Object.assign([], state.categories, {
      [index]: payload.data
    });
    state.categories = newArray;


  },
  FIND_CATEGORY(state, payload) {
    state.categories = state.categories.map(category => {
      if (category.id === payload.id) {
        return Object.assign({}, category, payload.data)
      }
      return category;
    })
  }


}

//endmutations

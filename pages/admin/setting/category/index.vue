<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Category" content-bg="white">
            <v-btn
              icon
              slot="widget-header-action"
              @click.stop="dialog = true,addcategorystatus=true"
            >
              <v-icon class="text--secondary">add</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action" to="/admin/setting">
              <v-icon class="text--secondary">reply</v-icon>
            </v-btn>
            <div slot="widget-content">
              <v-dialog v-model="dialog" max-width="500px">
                <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                <v-card>
                  <v-card-title>
                    <span v-if="addcategorystatus" class="headline">Create Category</span>
                    <span v-else class="headline">Update Category</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex lg12>
                          <v-card>
                            <v-card-text>
                              <v-form lazy-validation>
                                <v-layout row wrap>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Category"
                                      name="category"
                                      v-model.lazy="form.category"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-select
                                      :items="status"
                                      item-text="name"
                                      item-value="value"
                                      v-model.lazy="form.status"
                                      label="status"
                                    ></v-select>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      textarea
                                      label="Description"
                                      v-model.lazy="form.description"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-spacer></v-spacer>
                                </v-layout>
                              </v-form>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*Help Text here</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn
                      v-if="addcategorystatus"
                      color="blue darken-1"
                      flat
                      @click.native="addcategory"
                    >Save</v-btn>
                    <v-btn v-else color="blue darken-1" flat @click.native="updatecategory">Update</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-layout row wrap>
                <v-flex lg12>
                  <v-card>
                    <v-toolbar card color="white">
                      <v-text-field
                        flat
                        solo
                        prepend-icon="search"
                        placeholder="Type something"
                        v-model="search"
                        hide-details
                        class="hidden-sm-and-down"
                      ></v-text-field>
                      <v-btn icon>
                        <v-icon>filter_list</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text class="pa-0">
                      <v-data-table
                        :headers="complex.headers"
                        :search="search"
                        :items="items"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                        class="elevation-1"
                        item-key="name"
                      >
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.category }}</td>
                          <td>{{ props.item.description }}</td>
                          <td>
                            <v-btn v-if="props.item.status===1" color="success">{{'Active'}}</v-btn>
                            <v-btn v-else color="error">{{ 'Deactive'}}</v-btn>
                          </td>
                          <td>
                            <v-btn
                              @click.native="addcategorystatus=false,editcategory(props.item.id)"
                              depressed
                              outline
                              icon
                              fab
                              dark
                              color="primary"
                              small
                            >
                              <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn depressed outline icon fab dark color="pink" small>
                              <v-icon @click.prevent="deletecategory(props.item.id)">delete</v-icon>
                            </v-btn>
                          </td>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VWidget from "@/components/VWidget";
import { Items as Users } from "@/api/user";
export default {
  layout: "dashboard",
  components: {
    VWidget
  },
  data: () => ({
    addcategorystatus: true,
    dialog: false,
    status: [
      {
        name: "Active",
        value: 1
      },
      {
        name: "Deactive",
        value: 0
      }
    ],
    form: { category_id: "" },
    search: "",
    complex: {
      headers: [
        {
          text: "Category",
          value: "name"
        },
        {
          text: "Description",
          value: "email"
        },
        {
          text: "Action",
          value: ""
        }
      ]
    }
  }),
  methods: {
    addcategory() {
      this.$store.dispatch("category/AddCategory", this.form);
      this.form = "";
      this.dialog = false;
    },
    editcategory(id) {
      this.addcategorystatus = false;

      this.$axios.$get("/showcategory/" + id).then(response => {
        this.form = response.data[0];
        this.form.category_id = id;
        this.dialog = true;
      });
    },
    deletecategory(id) {
      this.$store.dispatch("category/Deletecategory", id);
    },
    updatecategory() {
      this.$store.dispatch("category/updatecategory", this.form);
      this.dialog = false;
      this.form = "";
    }
  },
  mounted() {
    if (this.items) {
      Object.assign({}, this.items);
    } else {
      this.items = "";
    }
    this.$store.dispatch("category/LoadCategory");
  },
  computed: {
    ...mapGetters({ items: "category/getallcategory" })
  },
  created() {}
};
</script>

<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Project Connection type" content-bg="white">
            <v-btn
              icon
              slot="widget-header-action"
              @click.stop="dialog = true,addconnectionstatus=true"
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
                    <span class="headline" v-if="addconnectionstatus">Create Connection</span>
                    <span class="headline" v-else>Update Connection</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex lg12>
                          <v-card>
                            <v-card-text>
                              <v-form v-model="valid" ref="form" lazy-validation>
                                <v-layout row wrap>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Connection Type"
                                      name="category"
                                      v-model="form.connectiontype"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-select
                                      :items="status"
                                      item-text="name"
                                      item-value="value"
                                      v-model="form.status"
                                      label="status"
                                    ></v-select>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      textarea
                                      label="Description"
                                      v-model="form.description"
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
                      v-if="addconnectionstatus"
                      color="blue darken-1"
                      flat
                      @click.native="addconnection"
                    >Save</v-btn>
                    <v-btn v-else color="blue darken-1" flat @click.native="updateconnection">Update</v-btn>
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
                          <td>{{ props.item.connectiontype }}</td>
                          <td>{{ props.item.description }}</td>
                          <td>
                            <v-btn v-if="props.item.status===1" color="success">{{'Active'}}</v-btn>
                            <v-btn v-else color="error">{{ 'Deactive'}}</v-btn>
                          </td>

                          <td>
                            <v-btn
                              @click.native="addconnectionstatus=false,editconnection(props.item.id)"
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
                            <v-btn
                              depressed
                              outline
                              icon
                              fab
                              dark
                              color="pink"
                              small
                              @click.prevent="deleteconnection(props.item.id)"
                            >
                              <v-icon>delete</v-icon>
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
import VWidget from "@/components/VWidget";
import { mapGetters } from "vuex";
export default {
  layout: "dashboard",
  components: {
    VWidget
  },
  data: () => ({
    addconnectionstatus: true,
    dialog: false,
    form: {},
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
    search: "",
    complex: {
      headers: [
        {
          text: "Connection",
          value: "connection"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Action",
          value: ""
        }
      ]
    }
  }),
  methods: {
    addconnection() {
      this.$store.dispatch("connection/AddConnection", this.form);
      this.dialog = false;
      this.form = "";
    },
    deleteconnection(id) {
      this.$store.dispatch("connection/DeleteConnection", id);
    },
    editconnection(id) {
      this.addconnectionstatus = false;
      this.$axios.$get("/showconnectiontype/" + id).then(response => {
        this.form = response.data[0];
        this.form.connectiontype_id = id;
        this.dialog = true;
      });
    },
    updateconnection() {
      this.$store.dispatch("connection/updateconnection", this.form);
      this.dialog = false;
      this.form = "";
    }
  },
  computed: {
    ...mapGetters({
      items: "connection/getallconnection"
    })
  },
  mounted() {
    this.$store.dispatch("connection/SetConnection");
  }
};
</script>

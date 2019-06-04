<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Projects Detail" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action" to="/admin/projects/distribution">
              <v-icon class="text--secondary">reply</v-icon>
            </v-btn>
            <div slot="widget-content">
              <fileuploads ref="showmodal"></fileuploads>
              <v-dialog v-model="dialog" max-width="500px">
                <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                <v-card>
                  <v-card-title>
                    <span class="headline">Create</span>
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
                                      label="License Number"
                                      name="license"
                                      v-model="lincenseNumber"
                                    ></v-text-field>
                                  </v-flex>
                               
                                  <v-flex lg12 sm12>
                                    <v-select :items="type" label="Project Scheme"></v-select>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-menu
                                      ref="menu"
                                      lazy
                                      :close-on-content-click="false"
                                      v-model="menu"
                                      transition="scale-transition"
                                      offset-y
                                      full-width
                                      :nudge-right="40"
                                      min-width="290px"
                                      :return-value.sync="date"
                                    >
                                      <v-text-field
                                        slot="activator"
                                        label="Issue Date"
                                        v-model="date"
                                        prepend-icon="event"
                                        readonly
                                      ></v-text-field>
                                      <v-date-picker v-model="date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn
                                          flat
                                          color="primary"
                                          @click="$refs.menu.save(date)"
                                        >OK</v-btn>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-menu
                                      ref="menu"
                                      lazy
                                      :close-on-content-click="false"
                                      v-model="menu"
                                      transition="scale-transition"
                                      offset-y
                                      full-width
                                      :nudge-right="40"
                                      min-width="290px"
                                      :return-value.sync="date"
                                    >
                                      <v-text-field
                                        slot="activator"
                                        label="Expiry Date"
                                        v-model="date"
                                        prepend-icon="event"
                                        readonly
                                      ></v-text-field>
                                      <v-date-picker v-model="date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn
                                          flat
                                          color="primary"
                                          @click="$refs.menu.save(date)"
                                        >OK</v-btn>
                                      </v-date-picker>
                                    </v-menu>
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
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-layout row wrap>
                <v-flex lg12>
                  <v-card color="grey lighten-4" flat tile>
                    <v-toolbar dense>
                      <v-toolbar-side-icon></v-toolbar-side-icon>

                      <v-toolbar-title>Projects General Details</v-toolbar-title>

                      <v-spacer></v-spacer>
                      <v-btn icon @click.prevent="showuploadmodal">
                        <v-icon dark>backup</v-icon>
                      </v-btn>
                      <v-btn icon to="/admin/projects/distribution/create">
                        <v-icon>add</v-icon>
                      </v-btn>

                      <v-btn icon>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex lg3>Name</v-flex>
                        <v-flex lg3>{{projectdata.name}}</v-flex>
                        <v-flex lg3>Latitude N1</v-flex>
                        <v-flex lg3>{{projectdata.start_lat1}}</v-flex>
                        <v-flex lg3>Latitude N2</v-flex>
                        <v-flex lg3>{{projectdata.end_lat1}}</v-flex>
                        <v-flex lg3>Latitude E1</v-flex>
                        <v-flex lg3>12.3234</v-flex>
                        <v-flex lg3>Latitude E2</v-flex>
                        <v-flex lg3>12.22212</v-flex>
                        <v-flex lg3>River</v-flex>
                        <v-flex lg3>Sunkoshi</v-flex>
                        <v-flex lg3>State</v-flex>
                        <v-flex lg3>Province 3</v-flex>
                        <v-flex lg3>Project Type</v-flex>
                        <v-flex lg3>-</v-flex>
                        <v-flex lg3>Project Scheme</v-flex>
                        <v-flex lg3>Run off River (RoR)</v-flex>
                        <v-flex lg3>Project Stage</v-flex>
                        <v-flex lg3>Commissioned</v-flex>
                        <v-flex lg3>CDD</v-flex>
                        <v-flex lg3>2075-01-21</v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex lg12>
                  <v-toolbar color="cyan" dark tabs>
                    <template v-slot:extension>
                      <v-tabs v-model="tab" color="cyan" align-with-title>
                        <v-tabs-slider color="yellow"></v-tabs-slider>

                        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
                      </v-tabs>
                    </template>
                  </v-toolbar>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                      <v-layout row wrap>
                        <v-flex lg12>
                          <v-card v-if="item === 'Documents'">
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
                              <v-btn icon @click.stop="documenDialog = true">
                                <v-icon>add</v-icon>
                              </v-btn>

                              <!--  <v-btn icon>
                                    <v-icon>edit</v-icon>
                                  </v-btn>
                                  <v-btn icon>
                                    <v-icon>delete</v-icon>
                              </v-btn>-->
                            </v-toolbar>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0">
                              <v-data-table
                                :headers="file.headers"
                                :search="search"
                                :items="file.items"
                                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                class="elevation-1"
                                item-key="name"
                              >
                                <template slot="items" slot-scope="props">
                                  <td>{{ props.item.title }}</td>
                                  <td>{{ props.item.issue_date }}</td>
                                  <td>{{ props.item.expiry_date }}</td>
                                  <td>{{ props.item.status }}</td>
                                  <td>{{ props.item.description }}</td>
                                  <td>
                                    <v-btn
                                      depressed
                                      outline
                                      icon
                                      fab
                                      dark
                                      color="primary"
                                      @click.prevent=" showeditmodal( props.item)"
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
                                      @click.prevent=" deletefile( props.item.id)"
                                    >
                                      <v-icon>delete</v-icon>
                                    </v-btn>
                                  </td>
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-card>
                          <v-card v-if="item === 'Developers'">
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
                              <v-btn icon @click.stop="dialog = true">
                                <v-icon>add</v-icon>
                              </v-btn>

                              <!--  <v-btn icon>
                                <v-icon>edit</v-icon>
                              </v-btn>
                              <v-btn icon>
                                <v-icon>delete</v-icon>
                              </v-btn>-->
                            </v-toolbar>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0">
                              <v-data-table
                                :headers="complex.headers"
                                :search="search"
                                :items="complex.items"
                                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                class="elevation-1"
                                item-key="name"
                              >
                                <template slot="items" slot-scope="props">
                                  <td>{{ props.item.name }}</td>
                                  <td>{{ props.item.email }}</td>
                                  <td>
                                    <v-btn depressed outline icon fab dark color="primary" small>
                                      <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn depressed outline icon fab dark color="pink" small>
                                      <v-icon>delete</v-icon>
                                    </v-btn>
                                  </td>
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-tab-item>
                  </v-tabs-items>
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
import { Items as Users } from "@/api/user";
import fileuploads from "@/components/fileupload/index";
export default {
  layout: "dashboard",
  components: {
    VWidget,
    fileuploads
  },
  data: () => ({
    projecttype: 1,
    uploaddialogue: false,
    project_id: "",
    projectdata: [],
    valid: true,
    lincenseNumber: "",
    picker: null,
    picker2: null,
    //
    arrayEvents: null,
    date1: null,
    date2: null,
    //
    date: null,
    menu: false,
    modal: false,
    tab: null,
    type: ["license 1", "license 2", "license 3"],
    items: [
      "Documents",
      "Developers",
      "License",
      "Power Purchase Agreements",
      "PDA"
    ],
    dialog: false,
    uploaddialog: false,
    search: "",
    complex: {
      headers: [
        {
          text: "Projects",
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
      ],
      items: Users
    },
    file: {
      headers: [
        {
          text: "Title",
          value: "name"
        },
        {
          text: "Isuue Date",
          value: "issue_date"
        },
        {
          text: "ExpiryDate",
          value: "expiry_date"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "Action",
          value: ""
        }
      ],
      items: []
    }
  }),
  methods: {
    showuploadmodal() {
      const role = 1;
      const id = this.project_id;
      this.$refs.showmodal.show(role, id);
    },
    showeditmodal(data) {
      this.$refs.showmodal.edit(data);
    },

    deletefile(id) {
      this.$refs.showmodal.deletefile(id);
      this.showdocuments;
    },
    async showdocuments() {
      await this.$axios
        .$get("/showdocumentfordist/" + this.project_id)
        .then(response => {
          this.file.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {},
  created() {
    this.project_id = window.$nuxt._route.params.details;
  },
  mounted() {
    this.showdocuments();
    if (this.project_id) {
      this.$axios
        .$get("/showdistrubution/" + this.project_id)
        .then(response => {
          this.projectdata = response.data[0];
        });
    }

  }
};
</script>
<style scooped>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.v-progress-circular {
  margin: 1rem;
}
</style>

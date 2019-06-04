<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Assignmenttask" content-bg="white">
            <v-btn icon slot="widget-header-action" @click.stop="dialog = true,taskstatus=true">
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
                    <span class="headline" v-if="taskstatus">Create Assignmenttask</span>
                    <span class="headline" v-else>Update Assignmenttask</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex lg12>
                          <v-card>
                            <v-card-text>
                              <v-form ref="form" lazy-validation>
                                <v-layout row wrap>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Task Assignment"
                                      name="projectassignment"
                                      v-model="form.project_assignment"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Taskid"
                                      name="taskid"
                                      v-model="form.task_id"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Targettype"
                                      name="targettype"
                                      v-model="form.target_type"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Target"
                                      name="target"
                                      v-model="form.target"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Start date"
                                      name="startdate"
                                      v-model="form.start_date"
                                    ></v-text-field>
                                  </v-flex>

                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="End date"
                                      name="Enddate"
                                      v-model="form.end_date"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-text-field
                                      label="Project"
                                      name="projectid"
                                      v-model="form.project_id"
                                    ></v-text-field>
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
                      color="blue darken-1"
                      flat
                      v-if="taskstatus"
                      @click.native="addassignmenttask"
                    >Save</v-btn>
                    <v-btn
                      color="blue darken-1"
                      flat
                      v-else
                      @click.native="updateassignmenttask"
                    >Update</v-btn>
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
                          <td>{{ props.item.project_assignment }}</td>
                          <td>{{ props.item.task_id }}</td>
                          <td>{{ props.item.target_type }}</td>
                          <td>{{ props.item.target }}</td>
                          <td>{{ props.item.start_date }}</td>
                          <td>{{ props.item.end_date }}</td>

                          <td>{{ props.item.project_id }}</td>
                          <td>{{ props.item.description }}</td>

                          <td>
                            <v-btn
                              @click.native="editassignmenttask(props.item.id),taskstatus=false"
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
                              <v-icon @click.prevent="deleteassignmenttask(props.item.id)">delete</v-icon>
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
    taskstatus: true,
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
    form: { taskdetail_id: "" },
    search: "",
    complex: {
      headers: [
        {
          text: "Project Assignment",
          value: "project_assignment"
        },
        {
          text: "Task",
          value: "task_id"
        },
        {
          text: "Target type",
          value: "target_type"
        },
        {
          text: "Target",
          value: "target"
        },
        {
          text: "Start Date",
          value: "start_date"
        },
        {
          text: "End Date",
          value: "end_date"
        },
        {
          text: "Project",
          value: "project_id"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "Action",
          value: ""
        }
      ]
    }
  }),
  methods: {
    addassignmenttask() {
      this.$store.dispatch("assignmenttask/Addassignmenttask", this.form);
      this.dialog = false;
    },

    deleteassignmenttask(id) {
      this.$store.dispatch("assignmenttask/Deleteassignmenttask", id);
    },
    editassignmenttask(id) {
      this.$axios.$get("/showtaskdetail/" + id).then(response => {
        this.form = response.data[0];
        this.form.taskdetail_id = id;
        this.dialog = true;
      });
    },
    updateassignmenttask() {
      this.$store.dispatch("assignmenttask/updateassignmenttask", this.form);
      this.dialog = false;
    }
  },
  mounted() {
    this.$store.dispatch("assignmenttask/Loadassignmenttask");
  },
  computed: {
    ...mapGetters({ items: "assignmenttask/getallassignmenttask" })
  },
  created() {}
};
</script>

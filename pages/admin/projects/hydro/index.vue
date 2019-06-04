<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Hydropower projects" content-bg="white">
            <v-btn icon slot="widget-header-action" to="/admin/projects/hydro/create">
              <v-icon class="text--secondary">add</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action" to="/admin/setting">
              <v-icon class="text--secondary">reply</v-icon>
            </v-btn>
            <div slot="widget-content">
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
                      <!-- <v-data-table
                        :headers="complex.headers"
                        :search="search"
                        :items="complex.items"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                        class="elevation-1"
                        item-key="name"
                      >
                        <template slot="items" slot-scope="props">
                          <tr @click="rowClick(props.item)">
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.email }}</td>
                            <td>
                              <v-btn depressed outline icon fab dark color="primary" small>
                                <v-icon>edit</v-icon>
                              </v-btn>
                              <v-btn depressed outline icon fab dark color="primary" small :to="'/admin/projects/'+props.item.uuid" nuxt>
                                <v-icon>arrow_right_alt</v-icon>
                              </v-btn>
                              <v-btn depressed outline icon fab dark color="pink" small>
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>-->
                      <v-data-table
                        :headers="headers"
                        :items="items"
                        :search="search"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                        class="elevation-1"
                        item-key="uuid"
                      >
                        <template slot="items" slot-scope="props">
                          <tr>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.project_cost}}</td>
                            <td>{{ props.item.installed_capacity }}</td>
                            <td>{{ props.item.design_discharge}}</td>
                            <td>{{ props.item.cod}}</td>
                            <td>
                              <nuxt-link
                                :to="{name:'admin-projects-hydro-create',params:{id:props.item.id}}"
                              >
                                <v-btn depressed outline icon fab dark color="primary" small>
                                  <v-icon>edit</v-icon>
                                </v-btn>
                              </nuxt-link>
                              <nuxt-link
                                :to="{name:'admin-projects-hydro-details',params:{details:props.item.id}}"
                              >
                                <v-btn depressed outline icon fab dark color="primary" small nuxt>
                                  <v-icon>arrow_right_alt</v-icon>
                                </v-btn>
                              </nuxt-link>

                              <v-btn depressed outline icon fab dark color="pink" small>
                                <v-icon @click="deletehydropower(props.item.id)">delete</v-icon>
                              </v-btn>
                            </td>
                          </tr>
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
    search: "",
    headers: [
      {
        text: "Project Name",
        value: "name"
      },
      {
        text: "ProjectCost",
        value: "projectcost"
      },
      {
        text: "Installed Capacity",
        value: "installed_capacity"
      },
      {
        text: "DesignDischarge",
        value: "design_discharge"
      },
      {
        text: "COD",
        value: "cod"
      },

      {
        text: "Action",
        value: ""
      }
    ]
  }),
  methods: {
    rowClick(data) {
      // console.log('/admin/projects/'+data.uuid);
      this.$router.push({
        path: "/admin/projects/hydro/" + data.uuid
      });
    },
    deletehydropower(id) {
      this.$store.dispatch("hydropower/Deletehydropower", id);
    }
  },
  mounted() {
    this.$store.dispatch("hydropower/Loadhydropower");
  },
  computed: {
    ...mapGetters({ items: "hydropower/getallhydropower" })
  }
};
</script>

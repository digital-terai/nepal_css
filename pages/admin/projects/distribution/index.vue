<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Distribution projects" content-bg="white">
            <v-btn icon slot="widget-header-action" to="/admin/projects/distribution/create">
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
                      <v-data-table
                        :headers="complex.headers"
                        :search="search"
                        :items="items"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                        class="elevation-1"
                        item-key="name"
                      >
                        <template slot="items" slot-scope="props">
                          <tr>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.configuration }}</td>
                            <td>{{ props.item.voltage_level }}</td>
                            <td>{{ props.item.length }}</td>

                            <td>
                              <nuxt-link
                                :to="{name:'admin-projects-distribution-create',params:{id:props.item.id}}"
                              >
                                <v-btn depressed outline icon fab dark color="primary" small>
                                  <v-icon>edit</v-icon>
                                </v-btn>
                              </nuxt-link>
                              <nuxt-link
                                :to="{name:'admin-projects-distribution-details',params:{details:props.item.id}}"
                              >
                                <v-btn depressed outline icon fab dark color="primary" small nuxt>
                                  <v-icon>arrow_right_alt</v-icon>
                                </v-btn>
                              </nuxt-link>

                              <v-btn depressed outline icon fab dark color="pink" small>
                                <v-icon @click="deletedistribution(props.item.id)">delete</v-icon>
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
    complex: {
      headers: [
        {
          text: "Project Name",
          value: "name"
        },
        {
          text: "Configuration",
          value: "configuration"
        },
        {
          text: "Voltage level",
          value: "voltage_level"
        },
        {
          text: "Length",
          value: "length"
        },
        {
          text: "Action",
          value: ""
        }
      ]
    }
  }),
  methods: {
    rowClick(data) {
      // console.log('/admin/projects/distribution/'+data.uuid);
      this.$router.push({
        path: "/admin/projects/" + data.uuid
      });
    },
    deletedistribution(id) {
      this.$store.dispatch("distribution/Deletedistribution", id);
    }
  },
  mounted() {
    this.$store.dispatch("distribution/Loaddistribution");
  },
  computed: {
    ...mapGetters({ items: "distribution/getalldistribution" })
  },
  created() {}
};
</script>


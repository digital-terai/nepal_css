<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget
            :title="addhydropowerproject?'CreateProject':'Update project'"
            content-bg="white"
          >
            <div slot="widget-content">
              <v-layout row wrap>
                <v-flex lg6>
                  <v-text-field label="Project Name" v-model="form.name"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Longitude E1" v-model="form.longitude_e1"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Longitude E2" v-model="form.longitude_e2"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Latitude N1" v-model="form.latitude_n1"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Latitude N2" v-model="form.latitude_n2"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Installed Capacity" v-model="form.installed_capacity"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Project Cost (in Crores)" v-model="form.projectcost"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-select
                    :items="stages"
                    item-value="id"
                    item-text="stage"
                    label="Project Stage"
                    v-model="form.stage_id"
                  ></v-select>
                </v-flex>
                <v-flex lg6>
                  <v-select
                    :items="schemes"
                    item-value="id"
                    item-text="scheme"
                    label="Project Scheme"
                    v-model="form.scheme_id"
                  ></v-select>
                </v-flex>
                <v-flex lg6>
                  <v-select
                    :items="connection"
                    item-value="id"
                    item-text="connectiontype"
                    label="Project Connection Type"
                    v-model="form.connectiontype_id"
                  ></v-select>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Cod" v-model="form.cod"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Design Description" v-model="form.design_discharge"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Design Head" v-model="form.design_head"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex lg1>
                  <v-btn color="info">Save and Add Another</v-btn>
                </v-flex>
                <v-flex lg1 offset-lg8>
                  <v-btn color="error" to="/admin/projects">Cancel</v-btn>
                </v-flex>
                <v-flex lg1>
                  <v-btn
                    v-if="addhydropowerproject"
                    color="info"
                    @click.native="addnewHydro"
                  >Add Project</v-btn>
                  <v-btn v-else color="info" @click.native="UpdateHydro">Update Project</v-btn>
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
import axios from "axios";
import VWidget from "@/components/VWidget";
import { mapGetters } from "vuex";
export default {
  layout: "dashboard",
  components: {
    VWidget
  },
  data: () => ({
    addhydropowerproject: true,
    form: {
      hydropower_id: ""
    }
  }),
  methods: {
    addnewHydro() {
      this.$store.dispatch("hydropower/Addhydropower", this.form);
    },
    UpdateHydro() {
      this.$store.dispatch("hydropower/Updatehydropower", this.form);
    }
  },
  computed: {
    ...mapGetters({
      river: "river/getallrivers",
      category: "category/getallcategory",
      stages: "stages/getstage",
      schemes: "scheme/getallscheme",
      connection: "connection/getallconnection"
    })
  },
  mounted() {
    this.$store.dispatch("connection/SetConnection");
    this.$store.dispatch("stages/getstages");
    this.$store.dispatch("scheme/getallschemes");

    if (this.id) {
      this.addhydropowerproject = false;
      this.$axios.$get("/showhydropower/" + this.id).then(response => {
        this.form = response.data[0];
        this.form.hydropower_id = this.id;
      });
    }
  },
  created() {
    this.id = window.$nuxt._route.params.id;
  }
};
</script>

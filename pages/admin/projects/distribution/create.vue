<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget
            :title="adddistributionproject?'CreateProject':'Update project'"
            content-bg="white"
          >
            <div slot="widget-content">
              <v-layout row wrap>
                <v-flex lg6>
                  <v-text-field label="Project Name" v-model="form.name"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-select
                    :items="voltage"
                    item-text="name"
                    item-value="value"
                    v-model="form.voltage_level"
                    label="Voltage level(kv)"
                  ></v-select>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label=" Configuration" v-model="form.configuration"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label=" Capacity" v-model="form.capacity"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Length" v-model="form.length"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="Start Longitude 1" v-model="form.start_log1"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="End Longitude 1" v-model="form.end_log1"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="Start Latitude 1" v-model="form.start_lat1"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label="End Latitude 1" v-model="form.end_lat1"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="Start Longitude 2" v-model="form.start_log2"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="End Longitude 2" v-model="form.end_log2"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="Start Latitude 2" v-model="form.start_lat2"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="End Latitude 2" v-model="form.end_lat2"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="Project Cost (in Crores)" v-model="form.project_cost"></v-text-field>
                </v-flex>

                <v-flex lg6>
                  <v-text-field label="Design Description" v-model="form.financing_modality"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <!-- <v-flex lg1>
                  <v-btn color="info">Save and Add Another</v-btn>
                </v-flex>-->
                <v-flex lg1 offset-lg8>
                  <v-btn color="error" to="/admin/projects">Cancel</v-btn>
                </v-flex>
                <v-flex lg1>
                  <v-btn
                    color="info"
                    @click="addDistributionProject"
                    v-if="adddistributionproject"
                  >Add Project</v-btn>
                  <v-btn color="info" @click="UpdateDistributionProject" v-else>Update Project</v-btn>
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
    adddistributionproject: true,
    form: {
      distrubution_id: ""
    },
    voltage: [
      {
        name: "Sixty Six",
        value: 66
      },
      {
        name: "Thirty Three",
        value: 33
      },
      {
        name: "Eleven",
        value: 11
      },
      {
        name: "Four",
        value: 4
      }
    ],
    id: ""
  }),
  methods: {
    addDistributionProject() {
      this.$store.dispatch("distribution/Adddistribution", this.form);
    },
    UpdateDistributionProject() {
      this.$store.dispatch("distribution/updatedistribution", this.form);
      console.log(this.form);
    }
  },
  created() {},
  computed: {},
  mounted() {
    if (this.id) {
      this.adddistributionproject = false;
      this.$axios.$get("/showdistrubution/" + this.id).then(response => {
        this.form = response.data[0];
        this.form.distrubution_id = this.id;
      });
    }
  },
  created() {
    this.id = window.$nuxt._route.params.id;
  }
};
</script>

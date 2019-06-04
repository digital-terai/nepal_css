<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget
            :title="addtransmissionproject?'CreateProject':'Update project'"
            content-bg="white"
          >
            <div slot="widget-content">
              <v-layout row wrap>
                <v-flex lg6>
                  <v-text-field label="Project Name" v-model="form.name"></v-text-field>
                </v-flex>
                <v-flex lg6>
                  <v-text-field label=" Voltage Level" v-model="form.voltage_level"></v-text-field>
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
                  <v-text-field label="Financing Modality" v-model="form.financing_modality"></v-text-field>
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
                    v-if="addtransmissionproject"
                    color="info"
                    @click="addnewTransmission"
                  >Add Project</v-btn>
                  <v-btn v-else color="info" @click="UpdateTransmission">Update Project</v-btn>
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
export default {
  layout: "dashboard",
  components: {
    VWidget
  },
  data: () => ({
    addtransmissionproject: true,
    form: { transmission_id: "" },
    id: ""
  }),
  methods: {
    addnewTransmission() {
      this.$store.dispatch("transmission/Addtransmission", this.form);
    },
    UpdateTransmission() {
      this.$store.dispatch("transmission/Updatetransmission", this.form);
    }
  },
  mounted() {
    if (this.id) {
      this.addtransmissionproject = false;
      this.$axios.$get("/showtransmission/" + this.id).then(response => {
        this.form = response.data[0];
        this.form.transmission_id = this.id;
      });
    }
  },
  created() {
    this.id = window.$nuxt._route.params.id;
  }
};
</script>

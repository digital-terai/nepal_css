<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Rivers" content-bg="white">
            <v-btn icon slot="widget-header-action" @click.stop="dialog = true,addriverstatus=true">
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
                    <span v-if="addriverstatus" class="headline">Add River</span>
                    <span v-else class="headline">Update River</span>
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
                                    <v-text-field label="River" name="river" v-model="form.river"></v-text-field>
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
                                    <v-select
                                      :items="country"
                                      item-text="country"
                                      item-value="id"
                                      v-model="form.country_id"
                                      label="Country"
                                    ></v-select>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-select
                                      :items="states"
                                      item-text="state"
                                      item-value="id"
                                      v-model="form.state_id"
                                      label="State"
                                    ></v-select>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-select
                                      :items="districts"
                                      item-text="district"
                                      item-value="id"
                                      v-model="form.district_id"
                                      label="Distriict"
                                    ></v-select>
                                  </v-flex>
                                  <v-flex lg12 sm12>
                                    <v-select
                                      :items="city"
                                      item-text="city"
                                      item-value="id"
                                      v-model="form.city_id"
                                      label="City"
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
                      v-if="addriverstatus"
                      color="blue darken-1"
                      flat
                      @click.prevent="addRiver"
                    >Save</v-btn>
                    <v-btn v-else color="blue darken-1" flat @click.prevent="updateRiver">Update</v-btn>
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
                          <td>{{props.item.river}}</td>
                          <td>{{ countrydata(props.item.country_id).country }}</td>
                          <td>{{ statedata(props.item.state_id).state}}</td>
                          <td>{{ districtdata(props.item.district_id).district}}</td>
                          <td>{{ citydata(props.item.city_id).city }}</td>
                          <td>{{ props.item.description}}</td>
                          <td>
                            <v-btn v-if="props.item.status===1" color="success">{{'Active'}}</v-btn>
                            <v-btn v-else color="error">{{ 'Deactive'}}</v-btn>
                          </td>

                          <td>
                            <v-btn
                              depressed
                              outline
                              icon
                              fab
                              dark
                              color="primary"
                              small
                              @click.native="addriverstatus=false,dialog=true,editriver(props.item.id)"
                            >
                              <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn depressed outline icon fab dark color="pink" small>
                              <v-icon @click.prevent="deleteriver(props.item.id)">delete</v-icon>
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
    dialog: false,
    addriverstatus: true,
    form: {
      river_id: ""
    },
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
          text: "River",
          value: "river"
        },
        {
          text: "Country",
          value: "country"
        },
        {
          text: "State",
          value: "state"
        },
        {
          text: "District",
          value: "district"
        },
        {
          text: "City",
          value: "city"
        },
        {
          text: "Description",
          value: "email"
        },
        {
          text: "Status",
          value: "status"
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
    addRiver() {
      this.$store.dispatch("river/AddRiver", this.form);
      this.form = "";
      this.dialog = false;
    },

    countrydata(id) {
      return this.$store.state.country.country.filter(
        country => country.id === id
      )[0];
    },

    statedata(id) {
      return this.$store.state.states.states.filter(
        state => state.id === id
      )[0];
    },
    districtdata(id) {
      return this.$store.state.district.district.filter(
        district => district.id === id
      )[0];
    },
    citydata(id) {
      return this.$store.state.city.city.filter(city => city.id === id)[0];
    },
    editriver(id) {
      this.$axios.$get("/showriver/" + id).then(response => {
        this.form = response.data[0];
        this.form.river_id = id;
        this.dialog = true;
      });
    },
    updateRiver() {
      this.$store.dispatch("river/updateriver", this.form);
      this.dialog = false;
      this.form = "";
    },
    deleteriver(id) {
      this.$store.dispatch("river/Deleteriver", id);
    }
  },
  computed: {
    ...mapGetters({
      country: "country/getallcountry",
      states: "states/getallstate",
      districts: "district/getalldistrict",
      city: "city/getallcity",
      items: "river/getallrivers",
      findbyid: () => "river/getriver"
    })
  },
  mounted() {
    this.$store.dispatch("country/SetCountry");
    this.$store.dispatch("states/SetState");
    this.$store.dispatch("district/SetDistrict");
    this.$store.dispatch("city/SetCity");
    this.$store.dispatch("river/AllRiver");
  }
};
</script>

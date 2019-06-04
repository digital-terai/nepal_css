<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12 v-for="(item, key) in settingList" :key="key">
          <v-widget :title="item.title" content-bg="white">
            <div slot="widget-content">
              <v-layout row wrap>
                <v-flex lg3 sm6 xs12 v-for="(setting,index) in item.list" :key="index">
                  <v-card :color="setting.cardColor" class="white--text">
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ setting.settingTitle}}</div>
                        <span>{{ setting.description }}</span>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat dark :to="setting.url">Add New</v-btn>
                    </v-card-actions>
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
import API from "@/api";
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";

export default {
  layout: "dashboard",
  components: {
    VWidget,
    MiniStatistic
  },
  data: () => ({
    color: Material,
    settingList: [
      {
        title: "Project Basic Information Settings",
        list: [
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "Project Category",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/category"
          },
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "Project River",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/river"
          },
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "Project Scheme",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/scheme"
          },
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "Project Stage",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/stage"
          },
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "Project Connection type",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/connection"
          }
        ]
      },
      {
        title: "Other Information Settings",
        list: [
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "License Type",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/licensetype"
          },
          {
            cardColor: "blue-grey darken-2",
            settingTitle: "Assignments Task",
            description:
              "Short Description about this settings. We also can add Help text here.",
            url: "/admin/setting/assignmenttask"
          }
        ]
      }
    ]
  }),
  computed: {
    activity() {
      return API.getActivity();
    },
    posts() {
      return API.getPost(3);
    },
    siteTrafficData() {
      return API.getMonthVisit;
    },
    locationData() {
      return API.getLocation;
    }
  }
};
</script>

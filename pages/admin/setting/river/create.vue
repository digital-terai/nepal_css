<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title=" Create Category" content-bg="white">
            <v-btn icon slot="widget-header-action" to="/admin/setting/category">
              <v-icon class="text--secondary">reply</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
              <v-layout row wrap>
                <v-flex lg12>
                  <v-card>
                    <v-card-text>
                      <v-form v-model="valid" ref="form" lazy-validation>
                        <v-layout row wrap>
                          <v-flex lg12 sm12>
                            <v-text-field label="Category" name="category" v-model="category">
                            </v-text-field>
                          </v-flex> 
                          <v-flex lg12 sm12>
                            <v-text-field textarea label="Description" v-model="description">
                            </v-text-field>
                          </v-flex>                              
                          <v-spacer></v-spacer>
                        </v-layout>        
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="pb-3">
                      <v-spacer></v-spacer>
                      <v-btn color="primary">Save</v-btn>
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
  import VWidget from '@/components/VWidget';
  export default {
    layout: 'dashboard',
    components: {
      VWidget,
    },
    data: () => ({
      category: null,
      valid: true,
      description:''
    }),
    methods:{
      closeDialog () {
        this.$parent.isActive = false;
      }
    },
    computed: {
    },

  };
</script>

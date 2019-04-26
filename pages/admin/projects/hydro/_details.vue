<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Projects Detail" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <v-btn icon slot="widget-header-action" to="/admin/projects">
              <v-icon class="text--secondary">reply</v-icon>
            </v-btn>
            <div slot="widget-content">
                <!-- document upload model start -->
                <v-dialog v-model="documenDialog" max-width="500px">
                    <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Document</span>
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
                                        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                                      </v-flex> 
                                      <v-flex lg12 sm12>
                                          <v-select
                                            :items="type"
                                            label="Document Type"
                                          ></v-select>
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
                                          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
                                          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
                            <v-btn color="blue darken-1" flat @click.native="documenDialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="documenDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- document upload model end -->
                <!-- developer upload model start -->
                <v-dialog v-model="developersDialog" max-width="800px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Developer</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex lg12>
                              <v-card>
                                <v-card-text>
                                    <v-form v-model="valid">
                                    <v-subheader class="pa-0 mt-3">DEVELOPER DETAIL</v-subheader>
                                    <v-layout row wrap>
                                        <v-flex lg3 sm12>
                                            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                                        </v-flex>
                                        <v-flex lg8 sm12 class="pb-2" offset-lg1>
                                            <v-text-field
                                                label="Full Name"
                                                name="fullname"
                                                placeholder="Michael Wang"
                                                v-model="formModel.name"
                                                v-validate="'required'"
                                                data-vv-name="fullname"     
                                                :error-messages="errors.collect('fullname')"  
                                                required
                                            ></v-text-field>    
                                            <v-text-field
                                                label="Email"
                                                placeholder="wangqiangshen@gmail.com"
                                                name="email"
                                                v-validate="'required|email'"
                                                data-vv-name="email"     
                                                :error-messages="errors.collect('email')"        
                                                v-model="formModel.email"
                                                required
                                              ></v-text-field>    
                                              <v-text-field
                                                label="Phone"
                                                placeholder="(###) ### - ####"
                                                v-validate="'required'"
                                                data-vv-name="phone"     
                                                :error-messages="errors.collect('phone')"                
                                                v-model="formModel.phone"
                                                mask="phone"
                                                required
                                              ></v-text-field> 
                                        </v-flex> 
                                    </v-layout>  
                                        <v-text-field
                                            label="Registration Number"
                                            placeholder="Enter Registration Number"
                                            v-validate="'required'"
                                            data-vv-name="registration_number"     
                                            :error-messages="errors.collect('registration_number')"                
                                            v-model="formModel.registration_number"
                                            mask="phone"
                                            required
                                        ></v-text-field>  
                                      <v-subheader class="pa-0 mt-3">ADDRESS</v-subheader>
                                      <v-select
                                        :items="countries"
                                        v-validate="'required'"
                                        data-vv-name="country"     
                                        :error-messages="errors.collect('country')"           
                                        v-model="formModel.country"
                                        label="Country"
                                        menu-props="auto"
                                        required
                                        item-text="country"
                                        item-value="abbr"
                                      ></v-select>
                                      <v-select
                                        :items="states"
                                        v-validate="'required'"
                                        data-vv-name="state"     
                                        :error-messages="errors.collect('state')"           
                                        v-model="formModel.state"
                                        label="State"
                                        menu-props="auto"
                                        required
                                        item-text="name"
                                        item-value="id"
                                      ></v-select>
                                      <v-select
                                        :items="cities"
                                        v-validate="'required'"
                                        data-vv-name="city"     
                                        :error-messages="errors.collect('city')"           
                                        v-model="formModel.city"
                                        label="City"
                                        required
                                        menu-props="auto"
                                        item-text="name"
                                        item-value="id"
                                      ></v-select>
                                    <v-text-field
                                      label="Zip Code"
                                      v-model="formModel.zipcode"
                                      required
                                    ></v-text-field>
                                    <v-text-field
                                      label="Address"
                                        v-validate="'required'"
                                        data-vv-name="address"     
                                        :error-messages="errors.collect('address')"         
                                      v-model="formModel.address"
                                      required
                                    ></v-text-field>
                                    <div class="form-btn">
                                      <v-btn outline @click="submit" color="primary">Submit</v-btn>
                                      <v-btn outline @click="clear">Clear</v-btn>
                                    </div>

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
                            <v-btn color="blue darken-1" flat @click.native="documenDialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="documenDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- developer upload model end -->
                <v-dialog v-model="LicenseDialog" max-width="500px">
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
                                        <v-text-field label="License Number" name="license" v-model="lincenseNumber">
                                        </v-text-field>
                                      </v-flex> 
                                      <v-flex lg12 sm12>
                                          <v-select
                                            :items="type"
                                            label="License Type"
                                          ></v-select>
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
                                          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
                                          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
                            <v-btn color="blue darken-1" flat @click.native="LicenseDialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="LicenseDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="ppaDialog" max-width="800px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Power Purchase Agreements</span>
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
                                                        <v-flex lg6 sm6>
                                                            <v-select
                                                                :items="dryMonths"
                                                                label="Dry Month"
                                                            ></v-select>
                                                        </v-flex>
                                                        <v-flex lg5 sm6 offset-lg1>
                                                            <v-select
                                                                :items="wetMonths"
                                                                label="Wet Month"
                                                            ></v-select>
                                                        </v-flex> 
                                                        <v-flex lg6 sm6>
                                                            <v-select
                                                                :items="type"
                                                                label="Organization"
                                                            ></v-select>
                                                        </v-flex>
                                                        <v-flex lg5 sm6 offset-lg1>
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
                                                                  label="Start Date"
                                                                  v-model="date"
                                                                  prepend-icon="event"
                                                                  readonly
                                                                ></v-text-field>
                                                                <v-date-picker v-model="date" no-title scrollable>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-flex> 
                                                        <v-flex lg6 sm6>
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
                                                                  label="End Date"
                                                                  v-model="date"
                                                                  prepend-icon="event"
                                                                  readonly
                                                                ></v-text-field>
                                                                <v-date-picker v-model="date" no-title scrollable>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-flex>
                                                       <v-flex lg5 sm6 offset-lg1>
                                                            <v-text-field label="Dry Rate (NRs.)" name="license" v-model="lincenseNumber">
                                                            </v-text-field>                
                                                        </v-flex>
                                                        <v-flex lg6 sm6>     
                                                            <v-text-field label="Wet Rate (NRs.)" name="license" v-model="lincenseNumber">
                                                            </v-text-field>              
                                                        </v-flex>
                                                       <v-flex lg5 sm6 offset-lg1>   
                                                            <v-text-field label="Dry Energy (GWh)" name="license" v-model="lincenseNumber">
                                                            </v-text-field>              
                                                        </v-flex> 
                                                        <v-flex lg6 sm6>     
                                                            <v-text-field label="Wet Energy (GWh)" name="license" v-model="lincenseNumber">
                                                            </v-text-field>              
                                                        </v-flex>
                                                       <v-flex lg5 sm6 offset-lg1>  
                                                            <v-text-field label="Total Energy (GWh)" name="license" v-model="lincenseNumber">
                                                            </v-text-field>              
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
                            <v-btn color="blue darken-1" flat @click.native="ppaDialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="ppaDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="pdaDialog" max-width="800px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Assignments</span>
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
                                                            <v-select
                                                                :items="task"
                                                                label="Select Task"
                                                            ></v-select>
                                                        </v-flex>
                                                         <v-flex lg12 sm12>
                                                            <v-text-field 
                                                                label="Target Type" 
                                                                name="license" 
                                                                v-model="sss">
                                                            </v-text-field> 
                                                        </v-flex> 
                                                         <v-flex lg12 sm12>
                                                            <v-text-field 
                                                                label="Target" 
                                                                name="license" 
                                                                v-model="ss">
                                                            </v-text-field> 
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
                                                                  label="Start Date"
                                                                  v-model="date"
                                                                  prepend-icon="event"
                                                                  readonly
                                                                ></v-text-field>
                                                                <v-date-picker v-model="date" no-title scrollable>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
                                                                  label="End Date"
                                                                  v-model="date"
                                                                  prepend-icon="event"
                                                                  readonly
                                                                ></v-text-field>
                                                                <v-date-picker v-model="date" no-title scrollable>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
                            <v-btn color="blue darken-1" flat @click.native="ppaDialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="ppaDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-layout row wrap>
                    <!-- project Details -->
                        <v-flex lg12>
                          <v-card
                            color="grey lighten-4"
                            flat
                            tile
                          >
                            <v-toolbar dense>
                              <v-toolbar-side-icon></v-toolbar-side-icon>

                              <v-toolbar-title>Projects General Details</v-toolbar-title>

                              <v-spacer></v-spacer>

                              <v-btn icon to="/admin/projects/create">
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
                                <v-flex lg3>
                                  Name
                                </v-flex>
                                <v-flex lg3>
                                  Sunkoshi Small Hydro Electric Project
                                </v-flex>
                                <v-flex lg3>
                                  Latitude N1
                                </v-flex>
                                <v-flex lg3>
                                  32.3234
                                </v-flex>
                                <v-flex lg3>
                                  Latitude N2
                                </v-flex>
                                <v-flex lg3>
                                  22.32323
                                </v-flex>
                                <v-flex lg3>
                                  Latitude E1
                                </v-flex>
                                <v-flex lg3>
                                  12.3234
                                </v-flex><v-flex lg3>
                                  Latitude E2
                                </v-flex>
                                <v-flex lg3>
                                  12.22212
                                </v-flex>
                                <v-flex lg3>
                                  River
                                </v-flex>
                                <v-flex lg3>
                                 Sunkoshi
                                </v-flex><v-flex lg3>
                                  State
                                </v-flex>
                                <v-flex lg3>
                                  Province 3
                                </v-flex>
                                <v-flex lg3>
                                  Project Type
                                </v-flex>
                                <v-flex lg3>
                                  -
                                </v-flex><v-flex lg3>
                                  Project Scheme
                                </v-flex>
                                <v-flex lg3>
                                  Run off River (RoR)
                                </v-flex>
                                <v-flex lg3>
                                  Project Stage
                                </v-flex>
                                <v-flex lg3>
                                  Commissioned
                                </v-flex>
                                <v-flex lg3>
                                  CDD
                                </v-flex>
                                <v-flex lg3>
                                  2075-01-21
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                    <!-- project Details -->
                    
                    <v-flex lg12>
                      <v-toolbar color="cyan" dark tabs>
                        <template v-slot:extension>
                          <v-tabs
                            v-model="tab"
                            color="cyan"
                            align-with-title
                          >
                            <v-tabs-slider color="yellow"></v-tabs-slider>

                            <v-tab v-for="item in items" :key="item">
                              {{ item }}
                            </v-tab>
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
                                  </v-btn> --> 
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
                                                <td>{{ props.item.fileName }}</td>
                                                <td>{{ props.item.fullPath }}</td>
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
                                        <v-btn icon @click.stop="developersDialog = true">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <v-card-text class="pa-0">
                                        <v-data-table
                                            :headers="developer.headers"
                                            :search="search"
                                            :items="developer.items"
                                            :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                            class="elevation-1"
                                            item-key="name"
                                        >
                                            <template slot="items" slot-scope="props">
                                                <td>{{ props.item.name }}</td>
                                                <td>{{ props.item.jobTitle }}</td>
                                                <td>{{ props.item.email }}/{{ props.item.phone }}</td>
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
                                <v-card v-if="item === 'License'">
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
                                      <v-btn icon @click.stop="LicenseDialog = true">
                                        <v-icon>add</v-icon>
                                      </v-btn> 
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <v-card-text class="pa-0">
                                      <v-data-table
                                        :headers="license.headers"
                                        :search="search"
                                        :items="license.items"
                                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                        class="elevation-1"
                                        item-key="name"
                                      >
                                        <template slot="items" slot-scope="props">
                                          <td>{{ props.item.uuid }}</td>
                                          <td>{{ props.item.jobTitle }}</td>
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
                                <v-card v-if="item === 'Power Purchase Agreements'">
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
                                        <v-btn icon @click.stop="ppaDialog = true">
                                            <v-icon>add</v-icon>
                                        </v-btn> 
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <v-card-text class="pa-0">
                                        <v-data-table
                                            :headers="ppa.headers"
                                            :search="search"
                                            :items="ppa.items"
                                            :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                            class="elevation-1"
                                            item-key="name"
                                        >
                                            <template slot="items" slot-scope="props">
                                                <td>{{ props.item.uuid }}</td>
                                                <td>{{ props.item.jobTitle }}</td>
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
                                <v-card v-if="item === 'PDA'">
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
                                        <v-btn icon @click.stop="pdaDialog = true">
                                            <v-icon>add</v-icon>
                                        </v-btn> 
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <v-card-text class="pa-0">
                                        <v-data-table
                                            :headers="pda.headers"
                                            :search="search"
                                            :items="pda.items"
                                            :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                            class="elevation-1"
                                            item-key="name"
                                        >
                                            <template slot="items" slot-scope="props">
                                                <td>{{ props.item.jobTitle }}</td>
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
    import VWidget from '@/components/VWidget';
    import {Items as Documents} from '@/api/file';
    import {Items as Developers } from '@/api/user';
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import Countries from '@/api/country';
  export default {
    $_veeValidate: {
        validator: 'new'
      }, 
    layout: 'dashboard',
    components: {
        vueDropzone: vue2Dropzone,
      VWidget
    },
    data: () => ({
        dryMonths: ['Dec','Jan','Feb','March','April','May'],
        wetMonths: ['June','July','August','Sept','Oct','Nov'],
        dropzoneOptions: {
            thumbnailWidth: 200,
            addRemoveLinks: true,
            url: 'https://httpbin.org/post',
            dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
        },
      valid:true,
      lincenseNumber:'',
      picker: null,
      picker2: null,
      //
      arrayEvents: null,
      date1: null,
      date2: null,
      formModel: {
      country: null,
        },
        countries: Countries,
        states: [
          { name: 'Florida', abbr: 'FL', id: 1, country_id: 1 },
          { name: 'Georgia', abbr: 'GA', id: 2, country_id: 1 },
          { name: 'Nebraska', abbr: 'NE', id: 3, country_id: 1 },
          { name: 'California', abbr: 'CA', id: 4, country_id: 1 },
        ],    
        cities: [
          { name: 'New York', abbr: 'NY', id: 1, country_id: 1 },
          { name: 'Tample', abbr: 'TA', id: 2, country_id: 1 },
          { name: 'San Francisco', abbr: 'SF', id: 3, country_id: 1 },
        ],    
        date: null,
        menu: false,
        modal: false,
        tab: null,
        type:['Pre Feasibility Report','Feasibility Study Report','Detail Project Report','EIA Report','IEE Report'],
        items: [
            'Documents', 'Developers','License', 'Power Purchase Agreements','PDA'
        ],
        documenDialog:false,
        developersDialog:false,
        LicenseDialog:false,
        ppaDialog:false,
        search: '',
        complex: {
            headers: [
                {
                    text: 'Document type',
                    value: 'email'
                },{
                    text: 'Description',
                    value: 'email'
                },{
                    text: 'Action',
                    value: ''
                },
            ],
            items: Documents
        },
        developer:{
            headers:[
                {
                    text: 'Name',
                    value: 'name'
                },{
                    text: 'Designation',
                    value: 'jobTitle'
                },{
                    text: 'Email/Phone',
                    value: ''
                },{
                    text: 'Action',
                    value: ''
                }
            ],
            items: Developers
        },
        license:{
            headers:[
                {
                    text: 'License Number',
                    value: 'name'
                },{
                    text: 'License Type',
                    value: 'jobTitle'
                },{
                    text: 'Action',
                    value: ''
                }
            ],
            items: Developers
        },
        ppa:{
            headers:[
                {
                    text: 'Organization',
                    value: 'name'
                },{
                    text: 'Total Energy',
                    value: 'jobTitle'
                },{
                    text: 'Action',
                    value: ''
                }
            ],
            items: Developers
        },
        pda:{
            headers:[
                {
                    text: 'Task',
                    value: 'name'
                },{
                    text: 'Action',
                    value: ''
                }
            ],
            items: Developers
        }
    }),
    methods:{
        submit () {
            this.$validator.validateAll();
        },
        clear () {
            this.formModel = {};
            this.$validator.reset();
        }  
    },
    computed: {
    },

  };
</script>

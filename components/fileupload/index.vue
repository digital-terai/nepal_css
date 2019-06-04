<template>
  <div>
    <v-dialog v-model="uploaddialog" max-width="800px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline" v-if="!editmode">Upload file</span>
          <span class="headline" v-else>Edit file</span>
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
                          <v-text-field label="Document Title" name="title" v-model="form.title"></v-text-field>
                        </v-flex>
                        <v-flex lg12 sm12>
                          <v-text-field
                            label="Issued Date"
                            name="issue_date"
                            v-model="form.issue_date"
                            id="nepaliDate3"
                          ></v-text-field>
                        </v-flex>
                        <v-flex lg12 sm12>
                          <v-text-field
                            label="Expiry Date"
                            name="expiry_date"
                            v-model="form.expiry_date"
                            id="nepaliDate4"
                          ></v-text-field>
                        </v-flex>
                        <v-flex lg6 sm6>
                          <v-menu
                            ref="menu1"
                            lazy
                            :close-on-content-click="false"
                            v-model="menu1"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-right="40"
                            min-width="290px"
                            :return-value.sync="form.issue_date"
                          >
                            <v-text-field
                              slot="activator"
                              label="Issue Date"
                              v-model="form.issue_data"
                              prepend-icon="event"
                              readonly
                            ></v-text-field>
                            <v-date-picker v-model="form.issue_date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                              <v-btn
                                flat
                                color="primary"
                                @click="$refs.menu1.save(form.issue_date)"
                              >OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex lg6 sm6>
                          <v-menu
                            ref="menu2"
                            lazy
                            :close-on-content-click="false"
                            v-model="menu2"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-right="40"
                            min-width="290px"
                            :return-value.sync="form.expiry_date"
                          >
                            <v-text-field
                              slot="activator"
                              label="Expiry Date"
                              v-model="form.expiry_data"
                              prepend-icon="event"
                              readonly
                            ></v-text-field>
                            <v-date-picker v-model="form.expiry_date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                              <v-btn
                                flat
                                color="primary"
                                @click="$refs.menu2.save(form.expiry_date)"
                              >OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>

                        <v-flex xs6 sm6 class="hidden-xs-only">
                          <v-date-picker
                            v-model="form.issue_date"
                            color="green lighten-1"
                            header-color="primary"
                          ></v-date-picker>
                        </v-flex>
                        <v-flex xs6 sm6 class="hidden-xs-only">
                          <v-date-picker
                            v-model="form.expiry_date"
                            color="green lighten-1"
                            header-color="primary"
                          ></v-date-picker>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12>
                          <v-textarea
                            name="input-7-1"
                            v-model="form.description"
                            label="Default style"
                            value
                            hint="Hint text"
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs12>
                          <label class="custom-file-upload">
                            <input type="file" @change="onFileselected" multiple>
                            <i class="fa fa-cloud-upload"></i> Select Upload
                          </label>
                        </v-flex>
                        <v-flex lg12 sm12>
                          <v-select
                            :items="status"
                            item-text="name"
                            item-value="value"
                            v-model.lazy="form.status"
                            label="status"
                          ></v-select>
                        </v-flex>
                      </v-layout>
                      <div v-if="showprogress">
                        <v-progress-circular
                          :rotate="-90"
                          :size="100"
                          :width="15"
                          :value="uploadprogress "
                          color="teal"
                        >{{ uploadprogress }}</v-progress-circular>
                      </div>
                      <!-- <progress max="100" :value.prop="uploadprogress"></progress> -->
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
          <v-btn color="blue darken-1" flat @click.native="uploaddialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="uploadfile" v-if="!editmode">Save</v-btn>
          <v-btn color="blue darken-1" flat @click.native="uploadfile" v-else>Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "fileuploads",

  data() {
    return {
      editmode: false,
      showprogress: false,
      menu1: false,
      menu2: false,
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
      form: {
        issue_date: new Date().toISOString().substr(0, 10),
        expiry_date: new Date().toISOString().substr(0, 10)
      },
      image: null,
      selectedfile: null,
      uploadprogress: 0,
      uploaddialog: false
    };
  },
  methods: {
    show(data, id) {
      this.editmode = false;
      this.form = {};
      this.uploaddialog = true;
      this.form.related = data;
      this.form.project_id = id;
    },
    edit(data) {
      this.editmode = true;
      this.uploaddialog = true;
      this.form = data;
    },
    onFileselected(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.image = file;
    },
    async uploadfile() {
      const formdata = new FormData();
      for (var key in this.form) {
        formdata.append(key, this.form[key]);
      }
      formdata.append("file", this.image);
      this.showprogress = true;
      var url = "";
      if (!this.editmode) {
        url = "/createdocument";
      } else {
        url = "/editdocument";
      }
      await this.$axios
        .$post(url, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: uploadEvent => {
            this.uploadprogress = Math.round(
              (uploadEvent.loaded / uploadEvent.total) * 100
            );
            if (this.uploadprogress === 100) {
              this.uploadprogress = 0;
            }
          }
        })
        .then(function(response) {
          this.showprogress = false;
          this.uploadprogress = 0;
          // this.form = "";
          this.$el.parent.showdocuments();
          console.log("SUCCESS!!");
        })
        .catch(function(error) {
          //this.form = "";
          this.showprogress = false;
          console.log("FAILURE!!");
        });
    },

    deletefiles(id) {
      this.$axios
        .$delete("/document/" + id)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    // $("#nepaliDate3").nepaliDatePicker({
    //   onFocus: true,
    //   npdMonth: true,
    //   npdYear: true,
    //   ndpTriggerButton: true,
    //   ndpTriggerButtonText: "calendar",
    //   ndpTriggerButtonClass: "btn btn-primary btn-lg"
    // });
    // $("#nepaliDate4").nepaliDatePicker({
    //   onFocus: true,
    //   npdMonth: true,
    //   npdYear: true,
    //   ndpTriggerButton: true,
    //   ndpTriggerButtonText: "calendar",
    //   ndpTriggerButtonClass: "btn btn-primary btn-lg"
    // });
  }
};
</script>

<style scooped>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>

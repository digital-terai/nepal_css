const pkg = require("./package");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: "Vue Material Admin Template",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Vue Material Admin Template is a \n" +
          "    Google Material Design inspired admin dashboard template built with Vue and Vuetify."
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "nepali.datepicker.v2.2.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ],
    script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js"
      },
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"
      },

      {
        src: "nepali.datepicker.v2.2.min.js"
      },


    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#3adced"
  },
  server: {
    port: 8000 // default: 3000
    // host: '0.0.0.0', // default: localhost
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/style/theme.styl",
    "~/assets/style/app.styl",
    "font-awesome/css/font-awesome.css",
    "roboto-fontface/css/roboto/roboto-fontface.css"

  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vuetify", "@/plugins/vee-validate", '@/plugins/nepalidate.js'],

  /*
   ** Nuxt.js modules
   */

  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "http://127.0.0.1:8000/api"
    //baseURL: "http://192.168.1.109:8001/api"
  },


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "meta.token"
          },
          user: {
            url: "auth/user",
            method: "get",
            propertyName: "data"
          },
          logout: {
            url: "auth/logout",
            method: "post"
          }
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()

    ],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

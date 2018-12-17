const webpack = require('webpack')

export default {
  srcDir: 'app',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Cashica | 貸し借りを可視化して借りパクをなくす',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cashica' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  css: [
    '~/assets/styles/main.css'
  ],
  loading: { color: '#00d1b2' },
  router: {
    middleware: 'authenticated'
  },
  /*
  ** Build configuration
  */
  env: {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    DATABASEURL: process.env.DATABASEURL,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID
  },
  build: {
    publicPath: '/assets/',
  },
  plugins: [
    '~/plugins/vue-qriously'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-115969381-2'
    }]
  ],
  vuetify: {}
}

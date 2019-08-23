import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import * as fb from 'firebase'
import vuetify from './plugins/vuetify'
import buyModal from '@/components/Shared/BuyModal'

Vue.config.productionTip = false
Vue.component('app-buy-modal', buyModal)

new Vue({
  created () {
    // eslint-disable-next-line no-unused-vars
    const firebaseConfig = {
      apiKey: 'AIzaSyDG2AoLosXoCT1LWSm10Y9vAp9XmxIoIgY',
      authDomain: 'project-cars-f591e.firebaseapp.com',
      databaseURL: 'https://project-cars-f591e.firebaseio.com',
      projectId: 'project-cars-f591e',
      storageBucket: 'project-cars-f591e.appspot.com',
      messagingSenderId: '843648664664',
      appId: '1:843648664664:web:bebc4b83c20fd970'
    }

    fb.initializeApp(firebaseConfig)
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

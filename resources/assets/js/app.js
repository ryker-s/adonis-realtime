import Vue from 'vue';

Vue.config.productionTip = false

import axios from 'axios'

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found');
}

Vue.prototype.$axios = axios.create()

import VueSocketIO from 'vue-socket.io'


axios.get('/login/jwt').then(res => {
  Vue.use(new VueSocketIO({
    debug: (process.env.NODE_ENV == 'development') ? true : false,
    connection: 'http://localhost:3333',
    options: {
      query: `auth_token=${res.data.token}`
    }
  }))
})

console.log('[i] Starting client app')
import Default from './components/Default.vue'

new Vue({
  el: '#app',
  components: {
    Default
  }
});

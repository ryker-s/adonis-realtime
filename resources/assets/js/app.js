import Vue from 'vue';

Vue.config.productionTip = false

console.log('[i] Starting client app')
import Default from './components/Default.vue'

new Vue({
  el: '#app',
  components: {
    Default
  },
  mounted() {
      console.log(10)
  }
});

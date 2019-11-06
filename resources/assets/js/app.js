import Vue from 'vue';

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

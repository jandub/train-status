import Vue from 'vue/dist/vue.js';
import VueSocketio from 'vue-socket.io';

import TrainStatus from './components/train-status.vue'


// Socket.io support
Vue.use(VueSocketio, '/');

// Register component
Vue.component('train-status', TrainStatus);

// Main Vue.js app
const app = new Vue({
  el: '#app'
})
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import './assets/tailwind.css'
import './plugins/element.js'
import 'normalize.css'

const app = new Vue({
  store,
  render: h => h(App),
})

app.$mount('#app')

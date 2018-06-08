import Vue from 'vue'
import App from './App.vue'

import Table from './components/Table/Table'

Vue.config.productionTip = false

/* new Vue({
  render: h => h(App)
}).$mount('#app') */


new Vue({
  render: h => h(Table)
}).$mount('#table')
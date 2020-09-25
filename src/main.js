import Vue from 'vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
import './assets/styles.css'
import 'ress/ress.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

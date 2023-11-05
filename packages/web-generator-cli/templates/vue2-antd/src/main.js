import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import antdv from './common/plugins/antdv'
import components from './common/plugins/components'

// 覆盖样式
import './styles/reset.less'

// 引入svg
import './assets/svg'

Vue.config.productionTip = false

Vue.use(antdv)
Vue.use(components)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

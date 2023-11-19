import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import registerPinia from './common/plugins/pinia'
import registerAntdv from './common/plugins/antdv'
import registerComponents from './common/plugins/components'

import './styles/reset.less'

const app = createApp(App)

app.use(registerPinia)
app.use(router)
app.use(registerAntdv)
app.use(registerComponents)

app.mount('#app')

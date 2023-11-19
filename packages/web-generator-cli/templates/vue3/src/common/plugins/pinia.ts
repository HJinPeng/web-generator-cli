import type { Plugin } from 'vue'
import store from '@/stores/index'

const registerPinia: Plugin = {
  install(app) {
    app.use(store)
  }
}

export default registerPinia

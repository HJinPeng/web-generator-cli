import VueRouter from 'vue-router'

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/',
      component: () => import('../views/Welcome.vue')
    }
  ]
})

export default router

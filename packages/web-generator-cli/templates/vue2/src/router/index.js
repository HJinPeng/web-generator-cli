import Vue from 'vue'
import VueRouter from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { allRouteMap, staticRouteMap } from './route-map'
import { generateRoute } from '@/common/utils/menu-route'
import { getStorageItem } from '@/common/storage'
import { TOKEN } from '@/common/storage/storage-key'

// 进度条配置
NProgress.configure({
  showSpinner: false // 去掉右上角转圈
})

Vue.use(VueRouter)

const routes = Object.keys(staticRouteMap).map((routeName) => {
  const route = staticRouteMap[routeName]
  return generateRoute(
    {
      path: route.path,
      name: routeName,
      componentPath: route.componentPath,
      layout: route.layout,
      title: route.title,
      hidden: false,
      id: undefined
    },
    []
  )
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (store.getters.Token) {
      if (to.matched.length) {
        next()
      } else {
        if (allRouteMap[to.name]) {
          // TODO: 判断远程是否有这个route name
          next('/403')
        } else {
          next('/404')
        }
      }
    } else {
      const token = getStorageItem(TOKEN)
      if (token) {
        store.commit('setToken', token)
        store
          .dispatch('getUserInfo')
          .then(() => {
            store.dispatch('getUserPermission').then(() => {
              next(to.fullPath)
            })
          })
          .catch(() => {
            next('/login')
          })
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach((to) => {
  store.commit('setViewStack', to)
  NProgress.done()
})

export default router

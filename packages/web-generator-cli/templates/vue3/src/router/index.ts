import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAuthStore } from '@/stores/auth'
import { useViewStackStore } from '@/stores/view-stack'
import { allRouteMap, staticRouteMap } from './route-map'
import { generateRoute } from '@/common/utils/menu-route'
import { getStorageItem } from '@/common/storage'

// 进度条配置
NProgress.configure({
  showSpinner: false // 去掉右上角转圈
})

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  NProgress.start()
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (authStore.token) {
      if (to.matched.length) {
        next()
      } else {
        if (typeof to.name === 'string' && allRouteMap[to.name]) {
          next('/403')
        } else {
          next('/404')
        }
      }
    } else {
      const token = getStorageItem('token')
      console.log('token', token)
      if (token) {
        authStore.setToken(token)
        try {
          await authStore.getUserInfo()
          await authStore.getUserPermission()
        } catch (error) {
          next('/login')
        }
        next(to.fullPath)
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach((to) => {
  const viewStackStore = useViewStackStore()
  viewStackStore.setViewStack(to)
  NProgress.done()
})

export default router

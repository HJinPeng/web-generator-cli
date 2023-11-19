import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import type { LayoutType } from '@/components/app-layout'

interface ViewStackItem {
  name?: string
  fullPath?: string
  title: string
  layout?: LayoutType
  clickable: boolean
}

// 根据页面栈和跳转的目标路由生成新的页面栈，用于缓存 & 面包屑
function generateViewStack(viewStack: Array<ViewStackItem>, to: RouteLocationNormalized) {
  // 如果to是异常页面，则直接推入栈中，返回上一页也可以还原页面栈数据
  if (to.name === '404' || to.name === '403') {
    return viewStack.concat(transformRouteToView(to))
  }
  const viewPath = to.meta.viewPath || []
  // 页面栈空，则直接用to的viewPath生成页面栈
  if (viewStack.length === 0) {
    return generateViewStackByTo(to)
  } else {
    const viewExistIndex = viewStack.findIndex((view) => view.fullPath === to.fullPath)
    // 目标页面存在页面栈中
    if (viewExistIndex !== -1) {
      // fix: 进入的页面clickable应该为true
      const result = viewStack.slice(0, viewExistIndex + 1)
      result[result.length - 1].clickable = true
      return result
    } else {
      // 目标页面的父级页面数量和当前页面栈数量一样多
      if ((to.meta.viewPath || []).length - 1 === viewStack.length) {
        // 比对每个页面是不是都匹配
        for (const i in viewStack) {
          // 有个页面不匹配
          if (viewStack[i].name !== viewPath[i].name) {
            return generateViewStackByTo(to)
          }
        }
        // 页面都匹配上了，push进栈
        return viewStack.concat(transformRouteToView(to))
      } else {
        return generateViewStackByTo(to)
      }
    }
  }
}

/**
 * 根据 目标路由to 来生成新的页面栈
 * @author jinpengh
 *
 * @param {import("vue-router").Route} to
 * @returns {Object}
 */
function generateViewStackByTo(to: RouteLocationNormalized): Array<ViewStackItem> {
  const viewPath = to.meta.viewPath || []
  const length = viewPath.length
  const parentViewPath = length === 0 ? [] : viewPath.slice(0, length - 1)

  return parentViewPath
    .map(
      (view): ViewStackItem => ({
        name: view.name,
        fullPath: view.path,
        title: view.title,
        layout: view.layout,
        clickable: false // 不可点击跳转
      })
    )
    .concat(transformRouteToView(to))
}

/**
 * 将 目标路由to 转为页面栈的一个页面
 * @author jinpengh
 *
 * @param {import("vue-router").Route} to
 * @returns {*}
 */
function transformRouteToView(to: RouteLocationNormalized): ViewStackItem {
  return {
    name: to.name as string | undefined,
    fullPath: to.fullPath,
    title: to.meta.title,
    layout: to.meta.layout,
    clickable: true // 可点击跳转
  }
}

export const useViewStackStore = defineStore('viewStack', () => {
  const viewStack = ref<Array<ViewStackItem>>([])

  function setViewStack(to: RouteLocationNormalized) {
    viewStack.value = generateViewStack(viewStack.value, to)
  }

  return {
    viewStack,
    setViewStack
  }
})

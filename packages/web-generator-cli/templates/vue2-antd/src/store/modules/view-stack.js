export default {
  state: {
    viewStack: []
  },
  getters: {},
  mutations: {
    setViewStack(state, to) {
      state.viewStack = generateViewStack(state.viewStack, to)
    }
  },
  actions: {}
}

/**
 * 根据页面栈和跳转的目标路由生成新的页面栈，用于缓存 & 面包屑
 * @author jinpengh
 *
 * @param {Array} viewStack
 * @param {import("vue-router").Route} to
 * @returns {Array}
 */
function generateViewStack(viewStack, to) {
  const viewPath = to.meta.viewPath || []
  // 页面栈空，则直接用to的viewPath生成页面栈
  if (viewStack.length === 0) {
    return generateViewStackByTo(to)
  } else {
    const viewExistIndex = viewStack.findIndex((view) => view.fullPath === to.fullPath)
    // 目标页面存在页面栈中
    if (viewExistIndex !== -1) {
      return viewStack.slice(0, viewExistIndex + 1)
    } else {
      // 目标页面的父级页面数量和当前页面栈数量一样多
      if ((to.meta.viewPath || []).length - 1 === viewStack.length) {
        // 比对每个页面是不是都匹配
        for (let i in viewStack) {
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
function generateViewStackByTo(to) {
  const viewPath = to.meta.viewPath || []
  const length = viewPath.length
  const parentViewPath = length === 0 ? [] : viewPath.slice(0, length - 1)
  return parentViewPath
    .map((view) => ({
      ...view,
      fullPath: view.path,
      clickable: false // 不可点击跳转
    }))
    .concat(transformRouteToView(to))
}

/**
 * 将 目标路由to 转为页面栈的一个页面
 * @author jinpengh
 *
 * @param {import("vue-router").Route} to
 * @returns {*}
 */
function transformRouteToView(to) {
  return {
    ...to,
    layout: to.meta.layout,
    title: to.meta.title,
    clickable: true // 可点击跳转
  }
}

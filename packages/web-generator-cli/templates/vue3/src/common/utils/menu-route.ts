import { h, type RendererElement, type RendererNode, type VNode } from 'vue'
import { BaseIcon } from '@/components/base-icon'
import { allRouteMap, type RouteItem } from '@/router/route-map'
import router from '@/router'
import type { Permission } from '@/api/system/auth/types'
import type { LayoutType } from '@/components/app-layout'
import type { RouteRecordRaw } from 'vue-router'

// 路由的整个路径，...祖父-父-本身
export interface ViewPath {
  id: string
  title: string
  path?: string
  hidden: boolean
  name?: string
  layout?: LayoutType
}

// 菜单项的类型
export interface MenuType extends Omit<Permission, 'id' | 'children' | 'icon'> {
  id: string
  key: string // 菜单渲染时用
  label: string // 菜单渲染时用
  title: string
  name?: string
  hidden: boolean
  path?: string
  layout?: LayoutType
  children?: Array<MenuType>
  icon: (() => VNode<RendererNode, RendererElement, { [key: string]: any }>) | undefined
}

// 用于生成路由的routeMap接口
interface RouteMapItem extends RouteItem {
  id?: string
  name: string
  hidden: boolean
}

// 所有菜单
export interface AllMenu {
  [id: string]: MenuType
}

// 根据组件路径 动态获取 src/views 下的组件
function getDynamicViewComp(componentPath: string) {
  const dynamicViewComp = import.meta.glob('../../views/**/*.vue')
  const key = `../../${componentPath}`.replace('//', '/')
  return dynamicViewComp[key]
}

// 根据菜单和routeMap生成所有菜单、侧边菜单、路由表
export function normalizeMenus(menus: Array<Permission>) {
  const allMenu: AllMenu = {} // 所有菜单
  const sidebarMenus: Array<MenuType> = [] // 侧边菜单
  const routes: Array<RouteRecordRaw> = [] // 根据菜单生成的routes
  traverseMenus(menus, [], allMenu, sidebarMenus, routes)
  return {
    allMenu,
    sidebarMenus,
    routes
  }
}

/**
 * 遍历菜单，根据菜单和routeMap生成所有菜单、侧边菜单、路由表
 * @author jinpengh
 *
 * @param menus
 * @param viewPath 菜单的完整路径
 * @param allMenu 所有菜单的 id:menu
 * @param sidebarMenus 侧边菜单/侧边菜单的children
 * @param routes 所有路由
 */
function traverseMenus(
  menus: Array<Permission>,
  viewPath: Array<ViewPath>,
  allMenu: AllMenu,
  sidebarMenus: Array<MenuType> | undefined,
  routes: Array<RouteRecordRaw>
) {
  menus.forEach((menu) => {
    const _menu: MenuType = {
      ...menu,
      key: `${menu.id}`,
      id: `${menu.id}`,
      label: menu.permissionName,
      title: menu.permissionName,
      name: menu.menuCode,
      hidden: menu.hiddenMenu === '1',
      children: undefined,
      icon: menu.icon ? () => h(BaseIcon, { icon: menu.icon as string }) : undefined
    }
    let routeMap
    if (_menu.name) {
      routeMap = allRouteMap[_menu.name]
      if (routeMap) {
        _menu.path = routeMap.path
        _menu.title = _menu.title || routeMap.title
        _menu.layout = _menu.layout || routeMap.layout
      } else {
        throw new Error(`找不到name为${_menu.name}对应的routeMap，请检查路由表`)
      }
    }

    const _viewPath: Array<ViewPath> = [
      ...viewPath,
      {
        id: _menu.id,
        title: _menu.title,
        path: _menu.path,
        hidden: _menu.hidden,
        name: _menu.name,
        layout: _menu.layout
      }
    ]

    // 路由
    if (routeMap) {
      const route: RouteMapItem = {
        id: _menu.id,
        path: _menu.path as string,
        name: _menu.name as string,
        componentPath: routeMap.componentPath,
        layout: _menu.layout as LayoutType, // 布局
        title: _menu.title,
        hidden: _menu.hidden
      }
      routes.push(generateRoute(route, _viewPath))
    }

    // 全部菜单
    allMenu[_menu.id] = { ..._menu }

    // 侧边栏菜单
    let sidebarMenusItem: MenuType | undefined = undefined
    if (Array.isArray(sidebarMenus) && !_menu.hidden) {
      sidebarMenusItem = { ..._menu }
      if (menu.children?.length && menu.children.find((item) => item.hiddenMenu !== '1')) {
        sidebarMenusItem.children = []
      }
      sidebarMenus.push(sidebarMenusItem)
    }

    if (menu.children?.length) {
      traverseMenus(
        menu.children,
        _viewPath,
        allMenu,
        sidebarMenusItem ? sidebarMenusItem.children : undefined,
        routes
      )
    }
  })
}

// 动态添加路由
export function addRoutes(routes: Array<RouteRecordRaw>) {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

// 根据路由基本信息生成对应路由
export function generateRoute(route: RouteMapItem, viewPath: Array<ViewPath>): RouteRecordRaw {
  return {
    path: route.path,
    name: route.name,
    component: getDynamicViewComp(route.componentPath),
    meta: {
      id: route.id,
      layout: route.layout, // 布局
      title: route.title,
      hidden: route.hidden,
      viewPath
    }
  }
}

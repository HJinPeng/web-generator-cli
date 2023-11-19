import 'vue-router'
import type { LayoutType } from './src/components/app-layout'
import type { ViewPath } from './src/common/utils/menu-route'

declare module 'vue-router' {
  interface RouteMeta {
    id?: string
    layout: LayoutType
    title: string
    hidden: boolean
    viewPath: Array<ViewPath>
  }
}

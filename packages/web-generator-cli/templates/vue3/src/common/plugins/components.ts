import type { Plugin } from 'vue'
import {
  AppLayout,
  LayoutSimple,
  LayoutHeader,
  LayoutHeaderSidebar,
  LayoutSidebarHeader
} from '@/components/app-layout'

import { AppPage } from '@/components/app-page'
import { BaseCard } from '@/components/base-card'
import { BaseIcon } from '@/components/base-icon'
import { BaseSpace } from '@/components/base-space'
import { BaseSearch } from '@/components/base-search'
import { BaseDict } from '@/components/base-dict'

const registerComponents: Plugin = {
  install: (app) => {
    app.component('AppLayout', AppLayout)
    app.component('LayoutSimple', LayoutSimple)
    app.component('LayoutHeader', LayoutHeader)
    app.component('LayoutHeaderSidebar', LayoutHeaderSidebar)
    app.component('LayoutSidebarHeader', LayoutSidebarHeader)
    app.component('AppPage', AppPage)
    app.component('BaseIcon', BaseIcon)
    app.component('BaseCard', BaseCard)
    app.component('BaseSpace', BaseSpace)
    app.component('BaseSearch', BaseSearch)
    app.component('BaseDict', BaseDict)
  }
}

export default registerComponents

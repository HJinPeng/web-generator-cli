import { AppPage } from '@/components/app-page'
import { BaseIcon } from '@/components/base-icon'
import { BaseCard } from '@/components/base-card'
import { BaseSearch } from '@/components/base-search'
import { BaseSpace } from '@/components/base-space'
import { BaseTable } from '@/components/base-table'
import { BaseDict } from '@/components/base-dict'

const registerComponents = {
  install: (Vue) => {
    Vue.component('AppPage', AppPage)
    Vue.component('BaseIcon', BaseIcon)
    Vue.component('BaseCard', BaseCard)
    Vue.component('BaseSearch', BaseSearch)
    Vue.component('BaseSpace', BaseSpace)
    Vue.component('BaseTable', BaseTable)
    Vue.component('BaseDict', BaseDict)
  }
}

export default registerComponents

<template>
  <keep-alive :include="cache.layouts">
    <component :is="$route.meta.layout">
      <keep-alive :include="cache.names">
        <router-view />
      </keep-alive>
    </component>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    LayoutSimple: () => import('./LayoutSimple.vue'),
    LayoutHeader: () => import('./LayoutHeader.vue'),
    LayoutHeaderSidebar: () => import('./LayoutHeaderSidebar.vue'),
    LayoutSidebarHeader: () => import('./LayoutSidebarHeader.vue')
  },
  computed: {
    ...mapGetters(['ViewStack']),
    cache() {
      const layouts = []
      const names = []
      this.ViewStack.forEach((view) => {
        view.layout && layouts.push(view.layout)
        view.name && names.push(view.name)
      })
      return {
        layouts,
        names
      }
    }
  }
}
</script>

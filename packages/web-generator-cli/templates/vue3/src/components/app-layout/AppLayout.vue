<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useViewStackStore } from '@/stores/view-stack'
import type { LayoutType } from '.'

const route = useRoute()
const viewStackStore = useViewStackStore()

const layout = computed(() => route.meta.layout)

const cache = computed(() => {
  const layouts: Array<LayoutType> = []
  const names: Array<string> = []
  viewStackStore.viewStack.forEach((view) => {
    view.layout && layouts.push(view.layout)
    view.name && names.push(view.name)
  })
  return {
    layouts,
    names
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cache.layouts">
      <component :is="layout">
        <keep-alive :include="cache.names">
          <component :is="Component" />
        </keep-alive>
      </component>
    </keep-alive>
  </router-view>
</template>

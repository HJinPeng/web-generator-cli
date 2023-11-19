<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Breadcrumb as ABreadcrumb } from 'ant-design-vue'
import { useViewStackStore } from '@/stores/view-stack'

const ABreadcrumbItem = ABreadcrumb.Item

const viewStackStore = useViewStackStore()
const viewStack = computed(() => viewStackStore.viewStack)

const router = useRouter()
const goBack = (index: number) => {
  router.go(-(viewStack.value.length - (index + 1)))
}
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in viewStack" :key="item.name">
      <a v-if="item.clickable && index !== viewStack.length - 1" @click="goBack(index)">
        {{ item.title }}
      </a>
      <span v-else>{{ item.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

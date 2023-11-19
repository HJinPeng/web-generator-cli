<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu as AMenu, type MenuProps } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'
import AppLogo from './AppLogo.vue'

defineProps<{
  hideLogo?: boolean
}>()

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const authStore = useAuthStore()

const route = useRoute()
watch(
  () => route,
  (newRoute) => {
    const viewPath = newRoute.meta.viewPath || []
    openKeys.value = viewPath.reduce((acc: string[], cur: any) => {
      if (!cur.path) return [...acc, `${cur.id}`]
      return acc
    }, [])
    for (let i = viewPath.length - 1; i >= 0; i--) {
      if (!viewPath[i].hidden) {
        selectedKeys.value = [`${viewPath[i].id}`]
        break
      }
    }
  },
  {
    immediate: true
  }
)

const router = useRouter()
const clickMenu: MenuProps['onClick'] = ({ key }) => {
  console.log('key,', key)
  selectedKeys.value = [key as string]
  // console.log()
  const menu = authStore.allMenu[key]
  router.push({ name: menu.name })
}
</script>

<template>
  <div class="app-sidebar">
    <AppLogo v-if="!hideLogo" class="app-sidebar__logo" />
    <a-menu
      v-model:selected-keys="selectedKeys"
      v-model:open-keys="openKeys"
      mode="inline"
      :items="(authStore.menu as any)"
      class="app-sidebar__menu"
      @click="clickMenu"
    >
    </a-menu>
  </div>
</template>

<style lang="less">
.app-sidebar {
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100%;
  overflow: hidden;
  border-right: solid 1px #e6e6e6;
  &__logo {
    height: 64px;
  }
  &__menu {
    flex: 1;
    overflow: hidden auto;
    border-right: none;
    &.a-menu {
      border-right: none;
    }
  }
}
</style>

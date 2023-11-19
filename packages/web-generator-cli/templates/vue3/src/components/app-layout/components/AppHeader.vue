<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeOutlined } from '@ant-design/icons-vue'
import AppUserPopover from './AppUserPopover.vue'
import AppLogo from './AppLogo.vue'

defineProps<{
  hideLogo?: boolean
}>()

const router = useRouter()
const goWelcome = () => {
  router.push({ name: 'Welcome' })
}
</script>

<template>
  <div class="app-header">
    <AppLogo v-if="!hideLogo" />
    <div class="app-header__main">
      <div class="app-header__left">
        <home-outlined @click="goWelcome" />
      </div>
      <div class="app-header__right">
        <AppUserPopover />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.app-header {
  display: flex;
  width: 100%;
  height: 64px;
  background: #fff;
  border-bottom: solid 1px #e6e6e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  &__home {
    font-size: 24px;
    color: #c0c4cc;
    cursor: pointer;
  }
  &__main {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 36px 0 40px;
  }
  &__left,
  &__right {
    display: flex;
    align-items: center;
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>

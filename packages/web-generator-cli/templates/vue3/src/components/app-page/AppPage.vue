<script setup lang="ts">
import AppBreadcrumb from './components/AppBreadcrumb.vue'
defineProps<{
  hideBreadcrumb?: boolean
}>()
</script>

<template>
  <div class="app-page">
    <AppBreadcrumb v-if="!hideBreadcrumb" class="app-page__breadcrumb" />
    <div class="app-page__body">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.app-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 20px 0;
  &__breadcrumb {
    margin-bottom: 16px;
  }
  &__body {
    flex: 1;
    padding: 1px;
    overflow: auto;
  }
}
</style>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="header-layout">
    <AppHeader />
    <div class="header-layout__body">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.header-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__body {
    flex: 1;
    overflow: hidden;
  }
}
</style>

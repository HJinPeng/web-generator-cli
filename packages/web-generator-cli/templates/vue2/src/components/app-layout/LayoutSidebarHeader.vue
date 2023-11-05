<template>
  <div class="layout-sidebar-header">
    <AppSidebar class="layout-sidebar-header__sidebar" />
    <div class="layout-sidebar-header__main">
      <AppHeader hide-logo class="layout-sidebar-header__header" />
      <div class="layout-sidebar-header__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
export default {
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>

<style lang="less">
.layout-sidebar-header {
  display: flex;
  height: 100%;
  &__main {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }

  &__content {
    flex: 1;
    overflow: auto;
  }
}
</style>

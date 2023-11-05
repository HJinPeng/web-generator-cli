<template>
  <div class="layout-header-sidebar">
    <AppHeader class="layout-header-sidebar__header" />
    <div class="layout-header-sidebar__body">
      <AppSidebar hide-logo class="layout-header-sidebar__side-menu" />
      <div class="layout-header-sidebar__content">
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
.layout-header-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  &__content {
    flex: 1;
    overflow: auto;
  }
}
</style>

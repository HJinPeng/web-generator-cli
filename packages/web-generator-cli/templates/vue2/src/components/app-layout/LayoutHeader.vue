<template>
  <div class="header-layout">
    <AppHeader />
    <div class="header-layout__body">
      <slot />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
export default {
  components: {
    AppHeader
  }
}
</script>

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

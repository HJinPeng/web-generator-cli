<script setup lang="ts">
const title = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div class="app-logo">
    <img src="@/assets/images/logo.png" :alt="title" class="app-logo__img" />
    <div class="app-logo__main">
      <h1 class="app-logo__title">{{ title }}</h1>
    </div>
  </div>
</template>

<style lang="less">
.app-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  background: #fff;
  &__img {
    width: 32px;
    margin-right: 14px;
  }
  &__main {
    display: flex;
    flex-direction: column;
  }
  &__title {
    margin-bottom: 0;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>

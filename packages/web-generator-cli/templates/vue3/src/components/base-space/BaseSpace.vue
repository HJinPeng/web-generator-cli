<script setup lang="ts">
import { Space as ASpace, Divider as ADivider } from 'ant-design-vue'
</script>

<template>
  <a-space>
    <template #split>
      <a-divider type="vertical" />
    </template>
    <slot />
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DictCategoryVue from './DictCategory.vue'
import DictItemVue from './DictItem.vue'
import type { DictCategory } from '@/api/system/dict/types'

const dict = ref<DictCategory>()
const onSelect = (row: DictCategory | undefined) => {
  dict.value = row
}
</script>

<template>
  <AppPage cls="dict-management">
    <div cls="main">
      <DictCategoryVue @select="onSelect" />
      <DictItemVue :dict="dict" />
    </div>
  </AppPage>
</template>

<style lang="less" module>
.dict-management {
  .main {
    display: flex;
    > * {
      flex: 1;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

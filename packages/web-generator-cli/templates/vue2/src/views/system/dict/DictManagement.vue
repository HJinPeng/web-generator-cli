<template>
  <AppPage class="dict-management">
    <div class="main">
      <DictCategory @select="onSelect" />
      <DictItem :dict="dict" />
    </div>
  </AppPage>
</template>

<script>
import DictCategory from './DictCategory.vue'
import DictItem from './DictItem.vue'

export default {
  components: { DictCategory, DictItem },
  data() {
    return {
      dict: undefined
    }
  },
  methods: {
    onSelect(row) {
      this.dict = row
    }
  }
}
</script>

<style lang="less" scoped>
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

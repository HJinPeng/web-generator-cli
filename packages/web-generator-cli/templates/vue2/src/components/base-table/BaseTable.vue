<template>
  <a-table
    ref="baseTable"
    :row-key="rowKey"
    v-bind="$attrs"
    v-on="$listeners"
    class="base-table"
    :class="sticky && 'base-table--sticky'"
  >
    <slot />
  </a-table>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    sticky: Boolean,
    rowKey: {
      type: [String, Function],
      default: 'id'
    }
  }
}
</script>

<style lang="less">
.base-table {
  &--sticky {
    .ant-table-thead {
      position: sticky;
      top: 0;
    }
  }
}
</style>

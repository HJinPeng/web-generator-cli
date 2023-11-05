<template>
  <div class="base-search" :class="disabled && 'base-search--disabled'">
    <slot />
    <div class="base-search__operation">
      <a-button type="primary" @click="onSearch" class="base-search__btn--search">查询</a-button>
      <a-button @click="onReset">重置</a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean
  },
  methods: {
    onSearch() {
      !this.disabled && this.$emit('search')
    },
    onReset() {
      !this.disabled && this.$emit('reset')
    }
  }
}
</script>

<style lang="less">
.base-search {
  display: flex;
  flex-wrap: wrap;
  margin: -4px -8px;
  &--disabled {
    * {
      cursor: not-allowed; // 禁用时鼠标样式
    }
  }
  &__operation {
    display: flex;
    &::before {
      display: inline-block;
      width: 1px;
      height: 30px;
      margin-right: 16px;
      content: '';
      background-image: linear-gradient(
        180deg,
        rgba(212, 214, 217, 0) 0%,
        rgba(212, 214, 217, 1) 50%,
        rgba(212, 214, 217, 0) 100%
      );
    }
  }
  &__btn--search {
    margin-right: 12px;
  }

  > * {
    margin: 4px 8px; // 每一项间距
    &:not(.base-search__operation) {
      width: 200px; // 表单项设置默认宽度
    }
  }
}
</style>

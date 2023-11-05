<template>
  <div class="base-card">
    <div v-if="title || $slots.title || $slots.extra" class="base-card__header">
      <div class="base-card__left">
        <slot name="title">
          <div v-if="title" class="base-card__title">{{ title }}</div>
        </slot>
      </div>
      <div class="base-card__right">
        <slot name="extra" />
      </div>
    </div>
    <div class="base-card__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="less">
.base-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 4px #edf0f4;
  & + & {
    margin-top: 16px;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &__title {
    display: flex;
    align-items: center;
    color: @primary-color;
    &::before {
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 8px;
      content: '';
      background-color: @primary-color;
      border-radius: 6px;
    }
  }
}
</style>

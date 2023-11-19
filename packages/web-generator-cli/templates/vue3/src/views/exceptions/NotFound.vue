<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div cls="not-found">
    <p cls="tip">页面不存在</p>
    <a-button type="primary" @click="router.go(-1)">返回上一页</a-button>
  </div>
</template>

<style lang="less" module>
.not-found {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .tip {
    font-size: 20px;
  }
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    font-size: 300px;
    font-weight: bold;
    color: #ebebeb;
    text-align: center;
    content: '404';
  }
}
</style>

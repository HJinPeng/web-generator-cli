<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue'
import { messageApi } from '@/components/message'
import { useAuthStore } from '@/stores/auth'
import type { LoginParams } from '@/api/system/auth/types'

const title = import.meta.env.VITE_APP_NAME

const model = reactive<LoginParams>({
  account: '',
  password: ''
})

const loading = ref<boolean>(false)
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const onLogin = () => {
  if (!model.account || !model.password) {
    messageApi.error('账号密码不能为空')
    return
  }
  loading.value = true
  authStore.login(model).then(() => {
    const redirect = route.query.redirect
    router.push(typeof redirect === 'string' ? redirect : { name: 'Welcome' })
  })
}
</script>

<template>
  <div cls="login-view">
    <div cls="form">
      <img src="@/assets/images/logo.png" alt="logo" cls="logo" />
      <h1>{{ title }}</h1>
      <a-input v-model:value="model.account" placeholder="账号" allow-clear>
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
      <a-input-password
        v-model:value="model.password"
        placeholder="密码"
        allow-clear
        @pressEnter="onLogin"
      >
        <template #prefix>
          <key-outlined />
        </template>
      </a-input-password>
      <a-button type="primary" :loading="loading" block @click="onLogin">登录</a-button>
    </div>
  </div>
</template>

<style lang="less" module>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
  .logo {
    width: 60px;
    height: 60px;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 360px;
    margin-top: -150px;
    background-color: #fff;
    .mixin-line();
    > * {
      margin-bottom: 12px;
    }
  }
}
</style>

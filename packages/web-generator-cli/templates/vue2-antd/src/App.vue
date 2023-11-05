<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <AppLayout />
    </a-config-provider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { AppLayout } from '@/components/app-layout'
export default {
  components: {
    [ConfigProvider.name]: ConfigProvider,
    AppLayout
  },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>

<script setup lang="ts">
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { messageContextHolder } from '@/components/message'
import { modalContextHolder } from '@/components/modal'
import { notificationContextHolder } from '@/components/notification'
import { AppLayout } from '@/components/app-layout'
dayjs.locale(zhCN.locale)
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{ token: { colorPrimary: '#29b49d', borderRadius: 4 } }"
  >
    <message-context-holder />
    <modal-context-holder />
    <notification-context-holder />
    <AppLayout />
  </a-config-provider>
</template>

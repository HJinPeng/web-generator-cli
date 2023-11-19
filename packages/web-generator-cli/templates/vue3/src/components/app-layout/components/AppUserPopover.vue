<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Popover as APopover } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { modal } from '@/components/modal'
import { messageApi } from '@/components/message'

const router = useRouter()
const authStore = useAuthStore()

const showPopover = ref<boolean>(false)

const onOpenChange = (visible: boolean) => {
  showPopover.value = visible
}

const onLogout = () => {
  showPopover.value = false
  modal.confirm({
    title: '退出',
    content: '确认退出登录吗？',
    onOk: async () => {
      await authStore.logout()
      messageApi.success('登出成功')
      router.push({ name: 'Login' })
    }
  })
}
</script>

<template>
  <a-popover
    v-model="showPopover"
    placement="bottom"
    trigger="click"
    class="app-user-popover"
    @openChange="onOpenChange"
  >
    <template v-slot:content>
      <div class="app-user-popover__content">
        <div @click="onLogout">退出登录</div>
      </div>
    </template>
    <div class="app-user-popover__userinfo">
      <span class="app-user-popover__username">{{ authStore.userInfo?.realname }}</span>
      <down-outlined
        class="app-user-popover__arrow"
        :class="showPopover && 'app-user-popover__arrow--rotate'"
      />
    </div>
  </a-popover>
</template>

<style lang="less">
.app-user-popover {
  &__userinfo {
    display: flex;
    align-items: center;
    .mixin-hover();
  }
  &__username {
    margin-right: 6px;
  }
  &__arrow {
    transition: transform 0.3s;
    &--rotate {
      transform: rotate(180deg);
    }
  }
  &__content {
    > div {
      text-align: center;
      .mixin-hover();
    }
  }
}
</style>

<template>
  <a-popover v-model="showPopover" placement="bottom" trigger="click" class="app-user-popover">
    <template slot="content">
      <div class="app-user-popover__content">
        <div @click="onLogout">退出登录</div>
      </div>
    </template>
    <div class="app-user-popover__userinfo">
      <span class="app-user-popover__username">{{ UserInfo.realname }}</span>
      <a-icon
        type="down"
        class="app-user-popover__arrow"
        :class="showPopover && 'app-user-popover__arrow--rotate'"
      />
    </div>
  </a-popover>
</template>

<script>
import { Popover } from 'ant-design-vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    [Popover.name]: Popover
  },
  data() {
    return {
      showPopover: false
    }
  },
  computed: {
    ...mapGetters(['UserInfo'])
  },
  methods: {
    ...mapActions(['logout']),
    onLogout() {
      this.showPopover = false
      this.$confirm({
        title: '退出',
        content: '确认退出登录吗？',
        onOk: async () => {
          await this.logout()
          this.$message.success('登出成功')
          this.$router.push({ name: 'Login' })
        }
      })
    }
  }
}
</script>

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

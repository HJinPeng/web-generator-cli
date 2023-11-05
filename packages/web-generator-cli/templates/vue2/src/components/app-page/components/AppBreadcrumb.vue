<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in ViewStack" :key="item.name">
      <a v-if="item.clickable && index !== ViewStack.length - 1" @click="goBack(index)">
        {{ item.title }}
      </a>
      <span v-else>{{ item.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item
  },
  computed: {
    ...mapGetters(['ViewStack'])
  },
  methods: {
    goBack(index) {
      this.$router.go(-(this.ViewStack.length - (index + 1)))
    }
  }
}
</script>

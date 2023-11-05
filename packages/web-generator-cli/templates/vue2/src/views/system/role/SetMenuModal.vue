<template>
  <a-modal
    v-model="visible"
    title="设置菜单权限"
    :confirm-loading="confirmLoading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-spin :spinning="loading">
      <a-tree
        v-model="checkedKeys"
        :tree-data="menuTree"
        checkable
        check-strictly
        :selectable="false"
        :replace-fields="{
          children: 'children',
          title: 'permissionName',
          key: 'id'
        }"
      >
        <template
          slot="title"
          slot-scope="{ permissionName, permissionType, externalLink, hiddenMenu }"
        >
          <a-space>
            <span>{{ permissionName }}</span>
            <a-icon v-if="permissionType === 'btn'" type="key" title="按钮" />
            <a-icon v-if="externalLink === '1'" type="link" title="外链" />
            <a-icon v-if="hiddenMenu === '1'" type="eye-invisible" title="隐藏" />
          </a-space>
        </template>
      </a-tree>
    </a-spin>
  </a-modal>
</template>

<script>
import { Tree, Spin, Space } from 'ant-design-vue'
import { getAllMenuApi } from '@/api/system/menu'
import { getRoleMenusApi, updateRoleMenusApi } from '@/api/system/role'
export default {
  components: {
    [Tree.name]: Tree,
    [Spin.name]: Spin,
    [Space.name]: Space
  },
  data() {
    return {
      loading: false,
      visible: false,
      confirmLoading: false,
      menuTree: [],
      checkedKeys: {
        checked: [],
        halfChecked: []
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val && this.menuTree.length === 0) {
          this.loading = true
          getAllMenuApi()
            .then((res) => {
              this.menuTree = res
            })
            .finally(() => {
              this.loading = false
            })
        }
      }
    }
  },
  methods: {
    // Expose 暴露给父组件的方法
    open(record) {
      this.visible = true
      this.roleId = record.id
      // 获取该角色拥有的菜单id
      this.loading = true
      getRoleMenusApi(this.roleId)
        .then((res) => {
          this.checkedKeys.checked = res
        })
        .finally(() => {
          this.loading = false
        })
    },
    onOk() {
      this.confirmLoading = true
      updateRoleMenusApi({
        roleId: this.roleId,
        menus: this.checkedKeys.checked
      })
        .then(() => {
          this.$message.success('修改成功')
          this.onCancel()
        })
        .finally(() => {
          this.confirmLoading = false
        })
    },
    onCancel() {
      this.visible = false
      this.loading = false
      this.confirmLoading = false
      this.checkedKeys = {
        checked: [],
        halfChecked: []
      }
    }
  }
}
</script>

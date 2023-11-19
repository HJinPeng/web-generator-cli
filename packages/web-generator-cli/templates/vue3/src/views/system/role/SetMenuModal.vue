<script setup lang="ts">
import { ref, watch } from 'vue'
import { Space as ASpace, Spin as ASpin, Tree as ATree } from 'ant-design-vue'
import { KeyOutlined, LinkOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import { messageApi } from '@/components/message'
import { getRoleMenusApi, updateRoleMenusApi } from '@/api/system/role'
import { getAllMenuApi } from '@/api/system/menu'
import type { Permission } from '@/api/system/auth/types'

const visible = ref<boolean>(false)
const loading = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const menuTree = ref<Permission[]>([])
const checkedKeys = ref<{ checked: number[]; halfChecked: number[] }>({
  checked: [],
  halfChecked: []
})
let roleId: number | undefined

watch(
  () => visible.value,
  (val) => {
    if (val && menuTree.value.length === 0) {
      loading.value = true
      getAllMenuApi()
        .then((res) => {
          menuTree.value = res
        })
        .finally(() => {
          loading.value = false
        })
    }
  },
  {
    immediate: true
  }
)

function onOk() {
  if (!roleId) {
    messageApi.error('角色不能为空')
    return
  }
  confirmLoading.value = true
  updateRoleMenusApi({
    roleId,
    menus: checkedKeys.value.checked
  })
    .then(() => {
      messageApi.success('修改成功')
      onCancel()
    })
    .finally(() => {
      confirmLoading.value = false
    })
}

function onCancel() {
  visible.value = false
  loading.value = false
  confirmLoading.value = false
  roleId = undefined
  checkedKeys.value = {
    checked: [],
    halfChecked: []
  }
}

function open(_roleId: number) {
  visible.value = true
  roleId = _roleId
  loading.value = true
  getRoleMenusApi(roleId)
    .then((res) => {
      checkedKeys.value = {
        checked: res,
        halfChecked: []
      }
    })
    .finally(() => {
      loading.value = false
    })
}

defineExpose<{
  open: (roleId: number) => void
}>({
  open
})
</script>

<template>
  <a-modal
    v-model:open="visible"
    title="设置菜单权限"
    :confirm-loading="confirmLoading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-spin :spinning="loading">
      <a-tree
        v-model:checkedKeys="checkedKeys"
        :tree-data="(menuTree as any)"
        checkable
        check-strictly
        :selectable="false"
        :field-names="{
          children: 'children',
          title: 'permissionName',
          key: 'id'
        }"
      >
        <template #title="{ permissionName, permissionType, externalLink, hiddenMenu }">
          <a-space>
            <span>{{ permissionName }}</span>
            <key-outlined v-if="permissionType === 'btn'" title="按钮" />
            <link-outlined v-if="externalLink === '1'" title="外链" />
            <eye-invisible-outlined v-if="hiddenMenu === '1'" title="隐藏" />
          </a-space>
        </template>
      </a-tree>
    </a-spin>
  </a-modal>
</template>

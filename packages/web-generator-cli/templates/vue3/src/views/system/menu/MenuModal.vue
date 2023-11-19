<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { TreeSelect as ATreeSelect } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import type { Permission } from '@/api/system/auth/types'
import { addMenuApi, editMenuApi } from '@/api/system/menu'
import type { AddMenuParams, EditMenuParams } from '@/api/system/menu/types'
import { messageApi } from '@/components/message'

defineProps<{
  menuTree: Array<Permission>
}>()

const emits = defineEmits<{
  (e: 'ok'): void
}>()

const form = ref<FormInstance | null>(null)

const visible = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)

const action = ref<'add' | 'edit'>('add')
const title = computed(() => {
  return `${action.value === 'edit' ? '编辑' : '新增'}菜单`
})
const isMenu = computed(() => {
  return wrap.model.permissionType === 'menu'
})

const initModel = (): AddMenuParams => {
  return {
    permissionType: 'menu',
    permissionName: '',
    menuCode: undefined,
    icon: undefined,
    ranking: undefined,
    permissionCode: undefined,
    layout: undefined,
    hiddenMenu: '0',
    keepAlive: '0',
    externalLink: '0',
    externalLinkContent: undefined,
    status: '1',
    parentId: undefined
  }
}

const wrap = reactive<{ model: AddMenuParams | EditMenuParams }>({
  model: initModel()
})

const validateLayout = (rule: Rule, value: AddMenuParams['layout']) => {
  if (wrap.model.menuCode && !value) {
    return Promise.reject('设置了menuCode，必须选择layout')
  }
  return Promise.resolve()
}
const validateExternalLinkContent = (rule: Rule, value: AddMenuParams['externalLinkContent']) => {
  if (wrap.model.externalLink === '1' && !value) {
    return Promise.reject('外链地址不能为空')
  }
  return Promise.resolve()
}
const rules: Record<string, Rule[]> = {
  permissionType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
  permissionName: [
    { required: true, message: '名称不能为空', trigger: 'blur' },
    { max: 20, message: '名称不超过20个字', trigger: 'blur' }
  ],
  menuCode: [{ max: 20, message: '组件编码不超过20个字符', trigger: 'blur' }],
  layout: [{ validator: validateLayout, trigger: 'change' }],
  externalLinkContent: [{ validator: validateExternalLinkContent, trigger: 'change' }]
}

const onCancel = () => {
  visible.value = false
  form.value?.resetFields()
  wrap.model = initModel()
}

const onOk = () => {
  if (action.value === 'edit' && 'id' in wrap.model && wrap.model.id === wrap.model.parentId) {
    messageApi.error('不能将菜单移动到自身下')
    return
  }
  form.value?.validate().then(async () => {
    if (!isMenu.value) {
      wrap.model.menuCode = undefined
      wrap.model.icon = undefined
      wrap.model.layout = undefined
      wrap.model.hiddenMenu = '0'
      wrap.model.keepAlive = '0'
      wrap.model.externalLink = '0'
      wrap.model.externalLinkContent = undefined
    }
    confirmLoading.value = true
    try {
      if (action.value === 'edit' && 'id' in wrap.model) {
        await editMenuApi(wrap.model)
        messageApi.success('修改成功')
      } else {
        await addMenuApi(wrap.model)
        messageApi.success('新增成功')
      }
      confirmLoading.value = false
      onCancel()
      emits('ok')
    } catch (error) {
      confirmLoading.value = false
    }
  })
}

const add = () => {
  visible.value = true
  action.value = 'add'
}

const edit = (_model: EditMenuParams) => {
  visible.value = true
  action.value = 'edit'
  wrap.model = { ..._model }
}

const addChild = (parentId: number) => {
  visible.value = true
  action.value = 'add'
  wrap.model.parentId = parentId
}

defineExpose<{
  add: () => void
  edit: (data: EditMenuParams) => void
  addChild: (parentId: number) => void
}>({
  add,
  edit,
  addChild
})
</script>

<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :confirm-loading="confirmLoading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-form
      ref="form"
      :model="wrap.model"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="上级菜单" name="parentId">
        <a-tree-select
          v-model:value="wrap.model.parentId"
          :tree-data="menuTree"
          allow-clear
          :field-names="{
            children: 'children',
            label: 'permissionName',
            value: 'id'
          }"
          placeholder="空表示顶级菜单"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item label="类型" name="permissionType">
        <BaseDict v-model:value="wrap.model.permissionType" dict-code="menu-btn" type="radio" />
      </a-form-item>
      <a-form-item
        :label="`${wrap.model.permissionType === 'menu' ? '菜单' : '按钮'}名称`"
        name="permissionName"
      >
        <a-input v-model:value="wrap.model.permissionName" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item v-if="isMenu" label="组件编码" name="menuCode">
        <a-input v-model:value="wrap.model.menuCode" placeholder="请输入组件编码" />
      </a-form-item>
      <a-form-item v-if="isMenu" label="图标" name="icon">
        <a-input v-model:value="wrap.model.icon" placeholder="请输入图标名称" />
      </a-form-item>
      <a-form-item v-if="isMenu" label="布局" name="layout">
        <BaseDict
          v-model:value="wrap.model.layout"
          dict-code="layout"
          type="select"
          placeholder="页面布局组件"
        />
      </a-form-item>
      <a-form-item label="权限码" name="permissionCode">
        <a-input v-model:value="wrap.model.permissionCode" placeholder="用于接口鉴权，控制显隐等" />
      </a-form-item>
      <a-form-item v-if="isMenu" label="是否显示" name="hiddenMenu">
        <BaseDict v-model:value="wrap.model.hiddenMenu" dict-code="show-hide" type="radio" />
      </a-form-item>
      <a-form-item v-if="isMenu" label="是否缓存" name="keepAlive">
        <BaseDict v-model:value="wrap.model.keepAlive" dict-code="keep-alive" type="radio" />
      </a-form-item>
      <a-form-item v-if="isMenu" label="是否外链" name="externalLink">
        <BaseDict v-model:value="wrap.model.externalLink" dict-code="external-link" type="radio" />
      </a-form-item>
      <a-form-item
        v-if="isMenu && wrap.model.externalLink === '1'"
        label="外链地址"
        name="externalLinkContent"
      >
        <a-input v-model:value="wrap.model.externalLinkContent" placeholder="外链url" />
      </a-form-item>
      <a-form-item label="排序" name="ranking">
        <a-input-number v-model:value="wrap.model.ranking" placeholder="排序" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <BaseDict v-model:value="wrap.model.status" dict-code="on-off" type="radio" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { messageApi } from '@/components/message'
import { addRoleApi, editRoleApi } from '@/api/system/role'
import type { AddRoleParams, EditRoleParams } from '@/api/system/role/types'

const emits = defineEmits<{
  (e: 'ok'): void
}>()

const visible = ref<boolean>(false)
const action = ref<'add' | 'edit'>('add')
const confirmLoading = ref<boolean>(false)
const form = ref<FormInstance | null>(null)
const rules: Record<string, Rule[]> = {
  roleCode: [
    { required: true, message: '角色编码不能为空', trigger: 'blur' },
    { max: 20, message: '角色编码不超过20个字', trigger: 'blur' }
  ],
  roleName: [
    { required: true, message: '角色名称不能为空', trigger: 'blur' },
    { max: 20, message: '角色名称不超过20个字符', trigger: 'blur' }
  ]
}

function initModal(): AddRoleParams {
  return {
    roleCode: '',
    roleName: '',
    status: '1'
  }
}
const wrap = reactive<{ model: AddRoleParams | EditRoleParams }>({
  model: initModal()
})

const title = computed(() => (action.value === 'edit' ? '编辑角色' : '新增角色'))

function onOk() {
  form.value?.validate().then(async () => {
    confirmLoading.value = true
    try {
      if (action.value === 'edit' && 'id' in wrap.model) {
        await editRoleApi(wrap.model)
        messageApi.success('修改成功')
      } else {
        await addRoleApi(wrap.model)
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

function onCancel() {
  visible.value = false
  form.value?.resetFields()
  wrap.model = initModal()
}

function add() {
  visible.value = true
  action.value = 'add'
}

function edit(model: EditRoleParams) {
  visible.value = true
  action.value = 'edit'
  wrap.model = { ...model }
}

defineExpose<{
  add: () => void
  edit: (model: EditRoleParams) => void
}>({
  add,
  edit
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
      <a-form-item label="角色编码" name="roleCode">
        <a-input v-model:value="wrap.model.roleCode" placeholder="请输入角色编码" />
      </a-form-item>
      <a-form-item label="角色名称" name="roleName">
        <a-input v-model:value="wrap.model.roleName" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <BaseDict v-model:value="wrap.model.status" dict-code="on-off" type="radio" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

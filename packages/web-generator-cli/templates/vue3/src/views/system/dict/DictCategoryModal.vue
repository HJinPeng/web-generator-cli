<script setup lang="ts">
import { addDictApi, editDictApi } from '@/api/system/dict'
import type { AddDictCategoryParams, EditDictCategoryParams } from '@/api/system/dict/types'
import { messageApi } from '@/components/message'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { computed, reactive, ref } from 'vue'

const emits = defineEmits<{
  (e: 'ok'): void
}>()

const visible = ref<boolean>(false)
const action = ref<'add' | 'edit'>('add')
const confirmLoading = ref<boolean>(false)
const form = ref<FormInstance | null>(null)
const rules: Record<string, Rule[]> = {
  dictCode: [
    { required: true, message: '字典编码不能为空', trigger: 'blur' },
    { max: 20, message: '字典编码不超过20个字', trigger: 'blur' }
  ],
  dictName: [
    { required: true, message: '字典名称不能为空', trigger: 'blur' },
    { max: 20, message: '字典名称不超过20个字符', trigger: 'blur' }
  ]
}

function initModal(): AddDictCategoryParams {
  return {
    dictCode: '',
    dictName: '',
    status: '1'
  }
}
const wrap = reactive<{ model: AddDictCategoryParams | EditDictCategoryParams }>({
  model: initModal()
})

const title = computed(() => (action.value === 'edit' ? '编辑字典' : '新增字典'))

function onOk() {
  form.value?.validate().then(async () => {
    confirmLoading.value = true
    try {
      if (action.value === 'edit' && 'id' in wrap.model) {
        await editDictApi(wrap.model)
        messageApi.success('修改成功')
      } else {
        await addDictApi(wrap.model)
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

function edit(model: EditDictCategoryParams) {
  visible.value = true
  action.value = 'edit'
  wrap.model = { ...model }
}

defineExpose<{
  add: () => void
  edit: (model: EditDictCategoryParams) => void
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
      <a-form-item label="字典名称" name="dictName">
        <a-input v-model:value="wrap.model.dictName" placeholder="请输入字典名称" />
      </a-form-item>
      <a-form-item label="字典编码" name="dictCode">
        <a-input v-model:value="wrap.model.dictCode" placeholder="请输入字典编码" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <BaseDict v-model:value="wrap.model.status" dict-code="on-off" type="radio" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

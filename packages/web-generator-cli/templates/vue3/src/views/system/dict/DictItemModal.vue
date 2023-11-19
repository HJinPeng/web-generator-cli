<script setup lang="ts">
import { addDictItemApi, editDictItemApi } from '@/api/system/dict/item'
import type { AddDictItemParams, EditDictItemParams } from '@/api/system/dict/types'
import { messageApi } from '@/components/message'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { computed, reactive, ref } from 'vue'

const props = defineProps<{
  dictId: number | undefined
}>()

const emits = defineEmits<{
  (e: 'ok'): void
}>()

const visible = ref<boolean>(false)
const action = ref<'add' | 'edit'>('add')
const confirmLoading = ref<boolean>(false)
const form = ref<FormInstance | null>(null)
const rules: Record<string, Rule[]> = {
  dictItemCode: [
    { required: true, message: '条目编码不能为空', trigger: 'blur' },
    { max: 20, message: '条目编码不超过20个字', trigger: 'blur' }
  ],
  dictItemName: [
    { required: true, message: '条目名称不能为空', trigger: 'blur' },
    { max: 20, message: '条目名称不超过20个字符', trigger: 'blur' }
  ]
}

function initModal(): AddDictItemParams {
  return {
    dictId: props.dictId || -1,
    dictItemCode: '',
    dictItemName: '',
    status: '1',
    sort: undefined
  }
}
const wrap = reactive<{ model: AddDictItemParams | EditDictItemParams }>({
  model: initModal()
})

const title = computed(() => (action.value === 'edit' ? '编辑条目' : '新增条目'))

function onOk() {
  if (wrap.model.dictId === -1) {
    messageApi.error('请选择字典再添加字典条目')
    return
  }
  form.value?.validate().then(async () => {
    confirmLoading.value = true
    try {
      if (action.value === 'edit' && 'id' in wrap.model) {
        await editDictItemApi(wrap.model)
        messageApi.success('修改成功')
      } else {
        await addDictItemApi(wrap.model)
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

function edit(model: EditDictItemParams) {
  visible.value = true
  action.value = 'edit'
  wrap.model = { ...model }
}

defineExpose<{
  add: () => void
  edit: (model: EditDictItemParams) => void
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
      <a-form-item label="条目名称" name="dictItemName">
        <a-input v-model:value="wrap.model.dictItemName" placeholder="请输入条目名称" />
      </a-form-item>
      <a-form-item label="条目编码" name="dictItemCode">
        <a-input v-model:value="wrap.model.dictItemCode" placeholder="请输入条目编码" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <BaseDict v-model:value="wrap.model.status" dict-code="on-off" type="radio" />
      </a-form-item>
      <a-form-item label="排序">
        <a-input-number v-model:value="wrap.model.sort" placeholder="序号" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

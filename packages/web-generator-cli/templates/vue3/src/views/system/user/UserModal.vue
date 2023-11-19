<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Spin as ASpin } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { messageApi } from '@/components/message'
import { addUserApi, editUserApi, getUserDetailApi } from '@/api/system/user'
import type { AddUserParams, EditUserParams, User } from '@/api/system/user/types'
import { getAllRoleApi } from '@/api/system/role'

const emits = defineEmits<{
  (e: 'ok'): void
}>()

const visible = ref<boolean>(false)
const action = ref<'add' | 'edit'>('add')
const confirmLoading = ref<boolean>(false)
const form = ref<FormInstance | null>(null)
const rules: Record<string, Rule[]> = {
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { max: 20, message: '账号不超过20个字', trigger: 'blur' }
  ],
  realname: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { max: 20, message: '用户名不超过20个字符', trigger: 'blur' }
  ],
  roles: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
}

const roleList = ref<{ label: string; value: number }[]>([])

watch(
  () => visible.value,
  (val) => {
    if (val && roleList.value.length === 0) {
      getAllRoleApi().then((res) => {
        roleList.value = res.map((item) => ({ value: item.id, label: item.roleName }))
      })
    }
  },
  { immediate: true }
)

function initModal(): AddUserParams {
  return {
    account: '',
    realname: '',
    status: '1',
    roles: []
  }
}
const wrap = reactive<{ model: AddUserParams | EditUserParams }>({
  model: initModal()
})

const title = computed(() => (action.value === 'edit' ? '编辑用户' : '新增用户'))

function onOk() {
  form.value?.validate().then(async () => {
    confirmLoading.value = true
    try {
      if (action.value === 'edit' && 'id' in wrap.model) {
        await editUserApi(wrap.model)
        messageApi.success('修改成功')
      } else {
        await addUserApi(wrap.model)
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

function edit(model: User) {
  visible.value = true
  action.value = 'edit'
  fetchUserDetail(model.id)
}

const loading = ref<boolean>(false)
function fetchUserDetail(userId: number) {
  loading.value = true
  getUserDetailApi(userId)
    .then((res) => {
      wrap.model = res
    })
    .finally(() => {
      loading.value = false
    })
}

defineExpose<{
  add: () => void
  edit: (model: User) => void
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
    <a-spin :spinning="loading">
      <a-form
        ref="form"
        :model="wrap.model"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="账号" name="account">
          <a-input
            v-model:value="wrap.model.account"
            :disabled="action === 'edit'"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="用户名" name="realname">
          <a-input v-model:value="wrap.model.realname" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="角色" name="roles">
          <a-select
            v-model:value="wrap.model.roles"
            :options="roleList"
            mode="multiple"
            placeholder="请选择角色"
          />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <BaseDict v-model:value="wrap.model.status" dict-code="on-off" type="radio" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

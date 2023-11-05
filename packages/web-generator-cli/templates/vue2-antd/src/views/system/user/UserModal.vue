<template>
  <a-modal
    v-model="visible"
    :title="title"
    :confirm-loading="confirmLoading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref="form"
        :model="model"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-model-item label="账号" prop="account">
          <a-input v-model="model.account" :disabled="action === 'edit'" placeholder="请输入账号" />
        </a-form-model-item>
        <a-form-model-item label="用户名" prop="realname">
          <a-input v-model="model.realname" placeholder="请输入用户名" />
        </a-form-model-item>
        <a-form-model-item label="角色" prop="roles">
          <a-select
            v-model="model.roles"
            :options="roleList"
            mode="multiple"
            placeholder="请选择角色"
          />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <BaseDict dict-code="on-off" v-model="model.status" type="radio" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { Spin } from 'ant-design-vue'
import { addUserApi, editUserApi, getUserDetailApi } from '@/api/system/user'
import { getAllRoleApi } from '@/api/system/role'
export default {
  components: {
    [Spin.name]: Spin
  },
  data() {
    return {
      loading: false,
      visible: false,
      confirmLoading: false,
      action: 'add', // 'add' | 'edit'
      model: this.initModel(),
      rules: Object.freeze({
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { max: 20, message: '账号不超过20个字', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { max: 20, message: '用户名不超过20个字符', trigger: 'blur' }
        ],
        roles: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
      }),
      roleList: []
    }
  },
  computed: {
    title() {
      return `${this.action === 'edit' ? '编辑' : '新增'}用户`
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val && this.roleList.length === 0) {
          getAllRoleApi().then((res) => {
            this.roleList = res.map((item) => ({ value: item.id, label: item.roleName }))
          })
        }
      }
    }
  },
  methods: {
    // Expose 暴露给父组件的方法
    add() {
      this.visible = true
      this.action = 'add'
    },
    // Expose 暴露给父组件的方法
    edit(model) {
      this.visible = true
      this.action = 'edit'
      this.fetchUserDetail(model.id)
    },
    onOk() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('校验通过')
          this.confirmLoading = true
          const fn = this.action === 'add' ? addUserApi : editUserApi
          fn(this.model)
            .then(() => {
              this.$emit('ok')
              this.$message.success(this.action === 'add' ? '新增成功' : '修改成功')
              this.onCancel()
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    onCancel() {
      console.log('onCancel')
      this.visible = false
      this.loading = false
      this.model = this.initModel()
      this.$refs.form.clearValidate()
    },
    // 初始化数据
    initModel() {
      return {
        account: undefined,
        realname: undefined,
        roles: [],
        status: '1'
      }
    },
    fetchUserDetail(userId) {
      this.loading = true
      getUserDetailApi(userId)
        .then((res) => {
          this.model = res
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

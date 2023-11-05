<template>
  <a-modal
    v-model="visible"
    :title="title"
    :confirm-loading="confirmLoading"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-form-model
      ref="form"
      :model="model"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="角色编码" prop="roleCode">
        <a-input v-model="model.roleCode" placeholder="请输入角色编码" />
      </a-form-model-item>
      <a-form-model-item label="角色名称" prop="roleName">
        <a-input v-model="model.roleName" placeholder="请输入角色名称" />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <BaseDict dict-code="on-off" v-model="model.status" type="radio" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { addRoleApi, editRoleApi } from '@/api/system/role'
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      action: 'add', // 'add' | 'edit'
      model: this.initModel(),
      rules: Object.freeze({
        roleCode: [
          { required: true, message: '角色编码不能为空', trigger: 'blur' },
          { max: 20, message: '角色编码不超过20个字', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { max: 20, message: '角色名称不超过20个字符', trigger: 'blur' }
        ]
      })
    }
  },
  computed: {
    title() {
      return `${this.action === 'edit' ? '编辑' : '新增'}角色`
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
      this.model = { ...model }
    },
    onOk() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('校验通过')
          this.confirmLoading = true
          const fn = this.action === 'add' ? addRoleApi : editRoleApi
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
      this.model = this.initModel()
      this.$refs.form.clearValidate()
    },
    // 初始化数据
    initModel() {
      return {
        roleCode: undefined,
        roleName: undefined,
        status: '1'
      }
    }
  }
}
</script>

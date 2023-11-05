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
      <a-form-model-item label="字典名称" prop="dictName">
        <a-input v-model="model.dictName" placeholder="请输入字典名称" />
      </a-form-model-item>
      <a-form-model-item label="字典编码" prop="dictCode">
        <a-input v-model="model.dictCode" placeholder="请输入字典编码" />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <BaseDict v-model="model.status" dict-code="on-off" type="radio" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { addDictApi, editDictApi } from '@/api/system/dict'
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      action: 'add', // 'add' | 'edit'
      model: this.initModel(),
      rules: Object.freeze({
        dictCode: [
          { required: true, message: '字典编码不能为空', trigger: 'blur' },
          { max: 20, message: '字典编码不超过20个字', trigger: 'blur' }
        ],
        dictName: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' },
          { max: 20, message: '字典名称不超过20个字符', trigger: 'blur' }
        ]
      })
    }
  },
  computed: {
    title() {
      return `${this.action === 'edit' ? '编辑' : '新增'}字典`
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
          const fn = this.action === 'add' ? addDictApi : editDictApi
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
        dictCode: undefined,
        dictName: undefined,
        status: undefined
      }
    }
  }
}
</script>

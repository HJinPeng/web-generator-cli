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
      <a-form-model-item label="条目名称" prop="dictItemName">
        <a-input v-model="model.dictItemName" placeholder="请输入条目名称" />
      </a-form-model-item>
      <a-form-model-item label="条目编码" prop="dictItemCode">
        <a-input v-model="model.dictItemCode" placeholder="请输入条目编码" />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <BaseDict v-model="model.status" dict-code="on-off" type="radio" />
      </a-form-model-item>
      <a-form-model-item label="排序">
        <a-input-number v-model="model.sort" placeholder="序号" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { InputNumber } from 'ant-design-vue'
import { addDictItemApi, editDictItemApi } from '@/api/system/dict/item'
export default {
  components: {
    [InputNumber.name]: InputNumber
  },
  props: {
    dictId: Number
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      action: 'add', // 'add' | 'edit'
      model: this.initModel(),
      rules: Object.freeze({
        dictItemCode: [
          { required: true, message: '条目编码不能为空', trigger: 'blur' },
          { max: 20, message: '条目编码不超过20个字', trigger: 'blur' }
        ],
        dictItemName: [
          { required: true, message: '条目名称不能为空', trigger: 'blur' },
          { max: 20, message: '条目名称不超过20个字符', trigger: 'blur' }
        ]
      })
    }
  },
  computed: {
    title() {
      return `${this.action === 'edit' ? '编辑' : '新增'}条目`
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
          const fn = this.action === 'add' ? addDictItemApi : editDictItemApi
          fn({
            ...this.model,
            dictId: this.dictId
          })
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
        dictItemCode: undefined,
        dictItemName: undefined,
        sort: undefined,
        status: undefined
      }
    }
  }
}
</script>

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
      <a-form-model-item label="上级菜单" prop="parentId">
        <a-tree-select
          v-model="model.parentId"
          :tree-data="menuTree"
          allow-clear
          :replace-fields="{
            children: 'children',
            title: 'permissionName',
            key: 'id',
            value: 'id'
          }"
          placeholder="空表示顶级菜单"
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="类型" prop="permissionType">
        <BaseDict dict-code="menu-btn" type="radio" v-model="model.permissionType" />
      </a-form-model-item>
      <a-form-model-item
        :label="`${model.permissionType === 'menu' ? '菜单' : '按钮'}名称`"
        prop="permissionName"
      >
        <a-input v-model="model.permissionName" placeholder="请输入名称" />
      </a-form-model-item>
      <a-form-model-item v-if="isMenu" label="组件编码" prop="menuCode">
        <a-input v-model="model.menuCode" placeholder="请输入组件编码" />
      </a-form-model-item>
      <a-form-model-item v-if="isMenu" label="图标" prop="icon">
        <a-input v-model="model.icon" placeholder="请输入图标名称" />
      </a-form-model-item>
      <a-form-model-item v-if="isMenu" label="布局" prop="layout">
        <BaseDict dict-code="layout" v-model="model.layout" placeholder="页面布局组件" />
      </a-form-model-item>
      <a-form-model-item label="权限码" prop="permissionCode">
        <a-input v-model="model.permissionCode" placeholder="用于接口鉴权，控制显隐等" />
      </a-form-model-item>
      <a-form-model-item v-if="isMenu" label="是否显示" prop="hiddenMenu">
        <BaseDict dict-code="show-hide" v-model="model.hiddenMenu" type="radio" />
      </a-form-model-item>
      <a-form-model-item v-if="isMenu" label="是否缓存" prop="keepAlive">
        <BaseDict dict-code="keep-alive" v-model="model.keepAlive" type="radio" />
      </a-form-model-item>
      <a-form-model-item v-if="isMenu" label="是否外链" prop="externalLink">
        <BaseDict dict-code="external-link" v-model="model.externalLink" type="radio" />
      </a-form-model-item>
      <a-form-model-item
        v-if="isMenu && model.externalLink === '1'"
        label="外链地址"
        prop="externalLinkContent"
      >
        <a-input v-model="model.externalLinkContent" placeholder="外链url" />
      </a-form-model-item>
      <a-form-model-item label="排序" prop="ranking">
        <a-input-number v-model="model.ranking" placeholder="排序" />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <BaseDict dict-code="on-off" v-model="model.status" type="radio" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { InputNumber, TreeSelect } from 'ant-design-vue'
import { addMenuApi, editMenuApi } from '@/api/system/menu'
export default {
  components: {
    [InputNumber.name]: InputNumber,
    [TreeSelect.name]: TreeSelect
  },
  props: {
    menuTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const validateLayout = (rule, value, callback) => {
      if (this.model.menuCode && !value) {
        callback(new Error('设置了menuCode，必须选择layout'))
      }
      callback()
    }
    const validateExternalLinkContent = (rule, value, callback) => {
      if (this.model.externalLink === '1' && !value) {
        callback(new Error('外链地址不能为空'))
      }
      callback()
    }
    return {
      visible: false,
      confirmLoading: false,
      action: 'add', // 'add' | 'edit'
      model: this.initModel(),
      rules: Object.freeze({
        permissionType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
        permissionName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { max: 20, message: '名称不超过20个字', trigger: 'blur' }
        ],
        menuCode: [{ max: 20, message: '组件编码不超过20个字符', trigger: 'blur' }],
        layout: [{ validator: validateLayout, trigger: 'change' }],
        externalLinkContent: [{ validator: validateExternalLinkContent, trigger: 'change' }]
      })
    }
  },
  computed: {
    title() {
      return `${this.action === 'edit' ? '编辑' : '新增'}菜单`
    },
    isMenu() {
      return this.model.permissionType === 'menu'
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
    // Expose 暴露给父组件的方法
    addChild(parentId) {
      this.visible = true
      this.action = 'add'
      this.model.parentId = parentId
    },
    onOk() {
      if (this.action === 'edit' && this.model.id === this.model.parentId) {
        this.$message.error('不能将菜单移动到自身下')
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('校验通过')
          // 不是菜单，只保留相关属性
          if (!this.isMenu) {
            const {
              id,
              parentId,
              permissionType,
              permissionName,
              permissionCode,
              ranking,
              status
            } = this.model
            const model = {
              permissionType,
              permissionName,
              menuCode: undefined,
              icon: undefined,
              ranking,
              permissionCode,
              layout: undefined,
              hiddenMenu: '0',
              keepAlive: '0',
              externalLink: '0',
              externalLinkContent: undefined,
              status,
              parentId
            }

            if (this.action === 'edit') {
              model.id = id
            }
            this.model = model
          }
          this.confirmLoading = true
          const fn = this.action === 'add' ? addMenuApi : editMenuApi
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
        permissionType: 'menu',
        permissionName: undefined,
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
  }
}
</script>

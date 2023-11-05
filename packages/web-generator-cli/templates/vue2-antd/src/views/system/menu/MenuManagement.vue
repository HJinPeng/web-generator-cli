<template>
  <AppPage>
    <BaseCard title="菜单管理">
      <template #extra>
        <a-button type="primary" @click="onAdd">新增</a-button>
      </template>
      <BaseTable
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        sticky
      ></BaseTable>
    </BaseCard>
    <MenuModal ref="modal" :menu-tree="dataSource" @ok="fetchMenuTree" />
  </AppPage>
</template>

<script>
import { deleteMenuApi, getAllMenuApi } from '@/api/system/menu'
import MenuModal from './MenuModal.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    MenuModal
  },
  data() {
    return {
      loading: false,
      columns: Object.freeze([
        {
          title: '菜单名称',
          dataIndex: 'permissionName'
        },
        {
          title: '菜单类型',
          dataIndex: 'permissionType',
          width: 200,
          customRender: (text) => this.Translate('menu-btn', text)
        },
        {
          title: '图标',
          dataIndex: 'icon',
          width: 200
        },
        {
          title: '组件',
          dataIndex: 'menuCode',
          width: 300
        },
        {
          title: '排序',
          dataIndex: 'ranking',
          width: 100
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          customRender: (text) => this.Translate('on-off', text)
        },
        {
          title: '操作',
          dataIndex: 'id',
          width: 200,
          customRender: (id, record) => {
            return (
              <BaseSpace>
                <a onClick={() => this.onEdit(record)}>编辑</a>
                <a onClick={() => this.onAddChild(record)}>添加下级</a>
                <a onClick={() => this.onDelete(record)}>删除</a>
              </BaseSpace>
            )
          }
        }
      ]),
      dataSource: []
    }
  },
  computed: {
    ...mapGetters(['Translate'])
  },
  async mounted() {
    await this.getDicts(['menu-btn', 'on-off'])
    this.fetchMenuTree()
  },
  methods: {
    ...mapActions(['getDicts']),
    fetchMenuTree() {
      this.loading = true
      getAllMenuApi()
        .then((res) => {
          this.dataSource = res
        })
        .finally(() => {
          this.loading = false
        })
    },
    onAdd() {
      this.$refs.modal.add()
    },
    onEdit(record) {
      console.log('record', record)
      this.$refs.modal.edit(record)
    },
    onAddChild(record) {
      this.$refs.modal.addChild(record.id)
    },
    onDelete(record) {
      this.$confirm({
        title: '删除',
        content: `确认删除菜单 “${record.permissionName}” 吗？`,
        onOk: () => {
          return deleteMenuApi(record.id).then(() => {
            this.$message.success('删除成功')
            this.fetchMenuTree()
          })
        }
      })
    }
  }
}
</script>

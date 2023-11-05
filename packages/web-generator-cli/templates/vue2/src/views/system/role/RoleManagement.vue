<template>
  <AppPage>
    <BaseCard>
      <BaseSearch
        :disabled="loading_mx_table"
        @search="onSearch_mx_table"
        @reset="onReset_mx_table"
      >
        <a-input
          v-model="params_mx_table.roleCode"
          placeholder="角色编码"
          allow-clear
          @pressEnter="onSearch_mx_table"
        ></a-input>
        <a-input
          v-model="params_mx_table.roleName"
          placeholder="角色名称"
          allow-clear
          @pressEnter="onSearch_mx_table"
        ></a-input>
        <BaseDict
          v-model="params_mx_table.status"
          dict-code="on-off"
          type="select"
          placeholder="状态"
          allow-clear
        />
      </BaseSearch>
    </BaseCard>
    <BaseCard title="角色列表">
      <template #extra>
        <a-button type="primary" @click="onAdd">新增</a-button>
      </template>
      <BaseTable
        :loading="loading_mx_table"
        :columns="columns_mx_table"
        :data-source="dataSource_mx_table"
        :pagination="pagination_mx_table"
        sticky
        @change="onChangeTable_mx_table"
      ></BaseTable>
    </BaseCard>
    <RoleModal ref="roleModal" @ok="fetchPage_mx_table" />
    <SetMenuModal ref="setMenuModal" />
  </AppPage>
</template>

<script>
import mixinTable from '@/common/mixins/table'
import RoleModal from './RoleModal.vue'
import SetMenuModal from './SetMenuModal.vue'
import { getRolePageApi, deleteRoleByIdApi } from '@/api/system/role'

export default {
  mixins: [mixinTable],
  components: { RoleModal, SetMenuModal },
  data() {
    return {
      // 该页需要用到的字典
      dictCodeArr_mx_table: ['on-off'],
      columns_mx_table: Object.freeze([
        { title: '角色编码', dataIndex: 'roleCode' },
        { title: '角色名称', dataIndex: 'roleName' },
        { title: '创建人', dataIndex: 'createByName' },
        { title: '创建时间', dataIndex: 'createDateTime' },
        {
          title: '状态',
          dataIndex: 'status',
          customRender: (text) => this.translate_mx_table('on-off', text)
        },
        {
          title: '操作',
          dataIndex: 'id',
          width: 160,
          customRender: (text, record, index) => {
            return (
              <BaseSpace>
                <a onClick={() => this.onEdit(record)}>编辑</a>
                <a onClick={() => this.onSetMenu(record)}>菜单</a>
                <a onClick={() => this.onDelete(record)}>删除</a>
              </BaseSpace>
            )
          }
        }
      ])
    }
  },
  methods: {
    // 新增角色
    onAdd() {
      console.log('新增角色')
      this.$refs.roleModal.add()
    },
    // 编辑角色
    onEdit(record) {
      console.log('编辑角色')
      this.$refs.roleModal.edit(record)
    },
    // 删除角色
    onDelete(record) {
      this.$confirm({
        title: '删除',
        content: `确认删除角色 “${record.roleName}” 吗？`,
        onOk: () => {
          return deleteRoleByIdApi(record.id).then(() => {
            this.$message.success('删除成功')
            // 当前页数据删完了，页码-1
            this.computePageNo_mx_table(record.id)
            this.fetchPage_mx_table()
          })
        }
      })
    },
    // 设置菜单权限
    onSetMenu(record) {
      this.$refs.setMenuModal.open(record)
    },
    // Overwrite 获取分页数据
    fetchPage_mx_table() {
      console.log('获取列表数据')
      this.loading_mx_table = true
      getRolePageApi({
        ...this.params_mx_table,
        pageNo: this.pagination_mx_table.current,
        pageSize: this.pagination_mx_table.pageSize
      })
        .then((res) => {
          console.log('res', res)
          this.dataSource_mx_table = res.records
          this.pagination_mx_table.total = res.total
        })
        .finally(() => {
          this.loading_mx_table = false
        })
    },
    // Overwrite 初始化查询参数
    initParams_mx_table() {
      return {
        roleCode: undefined,
        roleName: undefined,
        status: undefined
      }
    }
  }
}
</script>

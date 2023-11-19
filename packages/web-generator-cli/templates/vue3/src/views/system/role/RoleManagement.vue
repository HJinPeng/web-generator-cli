<script setup lang="tsx">
import { reactive, ref } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { useTable } from '@/common/hooks/use-table'
import { useDicts } from '@/common/hooks/use-dict'
import { messageApi } from '@/components/message'
import { modal } from '@/components/modal'
import RoleModal from './RoleModal.vue'
import SetMenuModal from './SetMenuModal.vue'
import { deleteRoleByIdApi, getRolePageApi } from '@/api/system/role'
import type { RolePageParams, Role } from '@/api/system/role/types'

const [translateStatus] = useDicts(['on-off'])

const roleModal = ref<InstanceType<typeof RoleModal> | null>(null)
const setMenuModal = ref<InstanceType<typeof SetMenuModal> | null>(null)

const params = reactive<RolePageParams>({
  roleCode: undefined,
  roleName: undefined,
  status: undefined
})

const { loading, pagination, onSearch, onReset, onChangeTable, computePageNo } = useTable({
  fetch,
  initParams
})

const dataSource = ref<Role[]>([])

const columns: TableColumnType<Role>[] = [
  { title: '角色编码', dataIndex: 'roleCode' },
  { title: '角色名称', dataIndex: 'roleName' },
  { title: '创建人', dataIndex: 'createByName' },
  { title: '创建时间', dataIndex: 'createDateTime' },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => translateStatus(record.status)
  },
  {
    title: '操作',
    dataIndex: 'id',
    width: 190,
    customRender: ({ record }) => {
      return (
        <base-space>
          <a onClick={() => onEdit(record)}>编辑</a>
          <a onClick={() => onSetMenu(record)}>菜单</a>
          <a onClick={() => onDelete(record)}>删除</a>
        </base-space>
      )
    }
  }
]

function fetch() {
  loading.value = true
  getRolePageApi({
    ...params,
    pageNo: pagination.current,
    pageSize: pagination.pageSize
  })
    .then((res) => {
      dataSource.value = res.records
      pagination.total = res.total
    })
    .finally(() => {
      loading.value = false
    })
}

function initParams() {
  params.roleCode = undefined
  params.roleName = undefined
  params.status = undefined
}

function onAdd() {
  roleModal.value?.add()
}
function onEdit(record: Role) {
  roleModal.value?.edit(record)
}
function onSetMenu(record: Role) {
  setMenuModal.value?.open(record.id)
}
function onDelete(record: Role) {
  modal.confirm({
    title: '删除',
    content: `确认删除角色 “${record.roleName}” 吗？`,
    onOk: async () => {
      return deleteRoleByIdApi(record.id).then(() => {
        messageApi.success('删除成功')
        // 当前页数据删完了，页码-1
        computePageNo(1, dataSource.value?.length)
        fetch()
      })
    }
  })
}
</script>

<template>
  <AppPage>
    <BaseCard gap>
      <BaseSearch :disabled="loading" @search="onSearch" @reset="onReset">
        <a-input
          v-model:value="params.roleName"
          placeholder="角色名称"
          allow-clear
          @pressEnter="onSearch"
        ></a-input>
        <a-input
          v-model:value="params.roleCode"
          placeholder="角色编码"
          allow-clear
          @pressEnter="onSearch"
        ></a-input>
        <BaseDict
          v-model:value="params.status"
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
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        @change="onChangeTable"
      ></a-table>
    </BaseCard>
    <RoleModal ref="roleModal" @ok="fetch" />
    <SetMenuModal ref="setMenuModal" />
  </AppPage>
</template>

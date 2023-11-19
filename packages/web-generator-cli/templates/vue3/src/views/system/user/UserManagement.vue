<script setup lang="tsx">
import { reactive, ref } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { useTable } from '@/common/hooks/use-table'
import { useDicts } from '@/common/hooks/use-dict'
import { messageApi } from '@/components/message'
import { modal } from '@/components/modal'
import UserModal from './UserModal.vue'
import { deleteUserByIdApi, getUserPageApi } from '@/api/system/user'
import type { UserPageParams, User } from '@/api/system/user/types'

const [translateStatus] = useDicts(['on-off'])

const userModal = ref<InstanceType<typeof UserModal> | null>(null)

const params = reactive<UserPageParams>({
  account: undefined,
  realname: undefined,
  status: undefined
})

const { loading, pagination, onSearch, onReset, onChangeTable, computePageNo } = useTable({
  fetch,
  initParams
})

const dataSource = ref<User[]>([])

const columns: TableColumnType<User>[] = [
  { title: '账号', dataIndex: 'account' },
  { title: '用户名', dataIndex: 'realname' },
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
    width: 140,
    customRender: ({ record }) => {
      return (
        <base-space>
          <a onClick={() => onEdit(record)}>编辑</a>
          <a onClick={() => onDelete(record)}>删除</a>
        </base-space>
      )
    }
  }
]

function fetch() {
  loading.value = true
  getUserPageApi({
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
  params.account = undefined
  params.realname = undefined
  params.status = undefined
}

function onAdd() {
  userModal.value?.add()
}
function onEdit(record: User) {
  userModal.value?.edit(record)
}

function onDelete(record: User) {
  modal.confirm({
    title: '删除',
    content: `确认删除用户 “${record.realname}” 吗？`,
    onOk: async () => {
      return deleteUserByIdApi(record.id).then(() => {
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
          v-model:value="params.account"
          placeholder="账号"
          allow-clear
          @pressEnter="onSearch"
        ></a-input>
        <a-input
          v-model:value="params.realname"
          placeholder="用户名"
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
    <BaseCard title="用户列表">
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
    <UserModal ref="userModal" @ok="fetch" />
  </AppPage>
</template>

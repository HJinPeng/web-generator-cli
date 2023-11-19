<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { getAllMenuApi, deleteMenuApi } from '@/api/system/menu'
import type { Permission } from '@/api/system/auth/types'
import { modal } from '@/components/modal'
import { messageApi } from '@/components/message'
import MenuModal from './MenuModal.vue'
import { useDicts } from '@/common/hooks/use-dict'

const [translateMenuType, translateStatus] = useDicts(['menu-btn', 'on-off'])

const loading = ref<boolean>(false)
const menuModal = ref<InstanceType<typeof MenuModal> | null>(null)

const onAdd = () => {
  menuModal.value?.add()
}
const onEdit = (record: Permission) => {
  menuModal.value?.edit(record)
}
const onAddChild = (record: Permission) => {
  menuModal.value?.addChild(record.id)
}

// 删除菜单
const onDelete = (record: Permission) => {
  modal.confirm({
    title: '删除',
    content: `确认删除菜单 “${record.permissionName}” 吗？`,
    onOk: async () => {
      return deleteMenuApi(record.id).then(() => {
        messageApi.success('删除成功')
        fetchMenuTree()
      })
    }
  })
}

const dataSource = ref<Permission[]>([])
const columns: TableColumnType<Permission>[] = [
  {
    title: '菜单名称',
    dataIndex: 'permissionName'
  },
  {
    title: '菜单类型',
    dataIndex: 'permissionType',
    width: 200,
    customRender: ({ record }) => translateMenuType(record.permissionType)
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
    customRender: ({ record }) => translateStatus(record.status)
  },
  {
    title: '操作',
    dataIndex: 'id',
    width: 220,
    customRender: ({ record }) => {
      return (
        <base-space>
          <a onClick={() => onEdit(record)}>编辑</a>
          <a onClick={() => onAddChild(record)}>添加下级</a>
          <a onClick={() => onDelete(record)}>删除</a>
        </base-space>
      )
    }
  }
]

const fetchMenuTree = () => {
  loading.value = true
  getAllMenuApi()
    .then((res) => {
      dataSource.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchMenuTree()
})
</script>

<template>
  <AppPage>
    <BaseCard title="菜单管理">
      <template #extra>
        <a-button type="primary" @click="onAdd">新增</a-button>
      </template>
      <a-table
        rowKey="id"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        sticky
      />
    </BaseCard>
    <MenuModal ref="menuModal" :menu-tree="dataSource" @ok="fetchMenuTree" />
  </AppPage>
</template>

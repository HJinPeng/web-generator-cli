<script setup lang="tsx">
import { reactive, ref } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { useTable } from '@/common/hooks/use-table'
import { useDicts } from '@/common/hooks/use-dict'
import { messageApi } from '@/components/message'
import { modal } from '@/components/modal'
import DictCategoryModal from './DictCategoryModal.vue'
import { deleteDictByIdApi, getDictPageApi } from '@/api/system/dict'
import type { DictCategoryPageParams, DictCategory } from '@/api/system/dict/types'

const emits = defineEmits<{
  (e: 'select', row?: DictCategory): void
}>()

const [translateStatus] = useDicts(['on-off'])

const dictCategoryModal = ref<InstanceType<typeof DictCategoryModal> | null>(null)

const params = reactive<DictCategoryPageParams>({
  dictCode: undefined,
  dictName: undefined,
  status: undefined
})

const { loading, pagination, onSearch, onReset, onChangeTable, computePageNo } = useTable({
  fetch,
  initParams
})

const dataSource = ref<DictCategory[]>([])

const columns: TableColumnType<DictCategory>[] = [
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '字典编码', dataIndex: 'dictCode' },
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
  getDictPageApi({
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
  params.dictCode = undefined
  params.dictName = undefined
  params.status = undefined
}

function onAdd() {
  dictCategoryModal.value?.add()
}
function onEdit(record: DictCategory) {
  dictCategoryModal.value?.edit(record)
}
function onDelete(record: DictCategory) {
  modal.confirm({
    title: '删除',
    content: `确认删除字典 “${record.dictName}” 吗？`,
    onOk: async () => {
      return deleteDictByIdApi(record.id).then(() => {
        messageApi.success('删除成功')
        // 当前页数据删完了，页码-1
        computePageNo(1, dataSource.value?.length)
        // 删除了当前选中行，条目表要清空
        selectRow()
        fetch()
      })
    }
  })
}

const activeId = ref<number>()
function setRowClassName(record: DictCategory) {
  return record.id === activeId.value ? 'dict-category__row--active' : ''
}

function selectRow(row?: DictCategory) {
  activeId.value = row?.id
  emits('select', row)
}
function customRow(record: DictCategory) {
  return {
    onClick: () => {
      selectRow(record)
    }
  }
}
</script>

<template>
  <div cls="dict-category">
    <BaseCard gap>
      <BaseSearch :disabled="loading" @search="onSearch" @reset="onReset">
        <a-input
          v-model:value="params.dictName"
          placeholder="字典名称"
          allow-clear
          style="width: 150px"
          @pressEnter="onSearch"
        ></a-input>
        <a-input
          v-model:value="params.dictCode"
          placeholder="字典编码"
          allow-clear
          style="width: 140px"
          @pressEnter="onSearch"
        ></a-input>
        <BaseDict
          v-model:value="params.status"
          dict-code="on-off"
          type="select"
          placeholder="状态"
          allow-clear
          style="width: 100px"
        />
      </BaseSearch>
    </BaseCard>
    <BaseCard title="字典列表">
      <template #extra>
        <a-button type="primary" @click="onAdd">新增</a-button>
      </template>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :row-class-name="setRowClassName"
        :custom-row="customRow"
        @change="onChangeTable"
      ></a-table>
    </BaseCard>
    <DictCategoryModal ref="dictCategoryModal" @ok="fetch" />
  </div>
</template>

<style lang="less" module>
.dict-category {
  :global {
    .dict-category__row--active {
      background: tint(@primary-color, 89%);
    }
  }
}
</style>

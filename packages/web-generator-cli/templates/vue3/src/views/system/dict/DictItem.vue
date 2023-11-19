<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { useTable } from '@/common/hooks/use-table'
import { useDicts } from '@/common/hooks/use-dict'
import { messageApi } from '@/components/message'
import { modal } from '@/components/modal'
import DictItemModal from './DictItemModal.vue'
import { deleteDictItemByIdApi, getDictItemPageApi } from '@/api/system/dict/item'
import type { DictItemPageParams, DictItem, DictCategory } from '@/api/system/dict/types'

const props = defineProps<{
  dict: DictCategory | undefined
}>()

const [translateStatus] = useDicts(['on-off'])

const dictId = computed(() => props.dict?.id)
const dictName = computed(() => props.dict?.dictName || '请先选择字典')

watch(
  () => props.dict,
  () => {
    pagination.current = 1
    fetch()
  }
)

const dictItemModal = ref<InstanceType<typeof DictItemModal> | null>(null)

const params = reactive<Omit<DictItemPageParams, 'dictId'>>({
  dictItemCode: undefined,
  dictItemName: undefined,
  status: undefined
})

const { loading, pagination, onSearch, onReset, onChangeTable, computePageNo } = useTable({
  fetch,
  initParams
})

const dataSource = ref<DictItem[]>([])

const columns: TableColumnType<DictItem>[] = [
  { title: '条目名称', dataIndex: 'dictItemName' },
  { title: '条目编码', dataIndex: 'dictItemCode' },
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
  if (!dictId.value) {
    dataSource.value = []
    pagination.current = 1
    pagination.total = 0
    return
  }
  loading.value = true
  getDictItemPageApi({
    ...params,
    dictId: dictId.value,
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
  params.dictItemCode = undefined
  params.dictItemName = undefined
  params.status = undefined
}

function onAdd() {
  dictItemModal.value?.add()
}
function onEdit(record: DictItem) {
  dictItemModal.value?.edit(record)
}
function onDelete(record: DictItem) {
  modal.confirm({
    title: '删除',
    content: `确认删除条目 “${record.dictItemName}” 吗？`,
    onOk: async () => {
      return deleteDictItemByIdApi(record.id).then(() => {
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
  <div>
    <BaseCard gap>
      <BaseSearch :disabled="loading" @search="onSearch" @reset="onReset">
        <a-input
          v-model:value="params.dictItemName"
          placeholder="条目名称"
          allow-clear
          style="width: 150px"
          @pressEnter="onSearch"
        ></a-input>
        <a-input
          v-model:value="params.dictItemCode"
          placeholder="条目编码"
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
    <BaseCard :title="`条目列表：${dictName}`">
      <template #extra>
        <a-button type="primary" :disabled="!dictId" @click="onAdd">新增</a-button>
      </template>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        @change="onChangeTable"
      ></a-table>
    </BaseCard>
    <DictItemModal ref="dictItemModal" :dict-id="dictId" @ok="fetch" />
  </div>
</template>

<template>
  <div>
    <BaseCard gap>
      <BaseSearch
        :disabled="loading_mx_table"
        @search="onSearch_mx_table"
        @reset="onReset_mx_table"
      >
        <a-input
          v-model="params_mx_table.dictItemName"
          placeholder="条目名称"
          allow-clear
          style="width: 150px"
          @pressEnter="onSearch_mx_table"
        ></a-input>
        <a-input
          v-model="params_mx_table.dictItemCode"
          placeholder="条目编码"
          allow-clear
          style="width: 140px"
          @pressEnter="onSearch_mx_table"
        ></a-input>
        <BaseDict
          v-model="params_mx_table.status"
          dict-code="on-off"
          type="select"
          placeholder="状态"
          allow-clear
          style="width: 100px"
        />
      </BaseSearch>
    </BaseCard>
    <BaseCard :title="`条目列表${dictName}`">
      <template #extra>
        <a-button type="primary" :disabled="!dictId" @click="onAdd">新增</a-button>
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
    <DictItemModal ref="modal" :dict-id="dictId" @ok="fetchPage_mx_table" />
  </div>
</template>

<script>
import mixinTable from '@/common/mixins/table'
import DictItemModal from './DictItemModal.vue'
import { getDictItemPageApi, deleteDictItemByIdApi } from '@/api/system/dict/item'

export default {
  mixins: [mixinTable],
  components: { DictItemModal },
  props: {
    dict: Object
  },
  data() {
    return {
      // 该页需要用到的字典
      dictCodeArr_mx_table: ['on-off'],
      columns_mx_table: Object.freeze([
        { title: '条目名称', dataIndex: 'dictItemName' },
        { title: '条目编码', dataIndex: 'dictItemCode' },
        {
          title: '状态',
          dataIndex: 'status',
          customRender: (text) => this.translate_mx_table('on-off', text)
        },
        { title: '排序', dataIndex: 'sort' },
        {
          title: '操作',
          dataIndex: 'id',
          width: 120,
          customRender: (text, record, index) => {
            return (
              <BaseSpace>
                <a onClick={() => this.onEdit(record)}>编辑</a>
                <a onClick={() => this.onDelete(record)}>删除</a>
              </BaseSpace>
            )
          }
        }
      ])
    }
  },
  computed: {
    dictName() {
      const name = this.dict?.dictName
      return name ? `：${name}` : ''
    },
    dictId() {
      return this.dict?.id
    }
  },
  watch: {
    dict() {
      this.pagination_mx_table.current = 1
      this.fetchPage_mx_table()
    }
  },
  methods: {
    // 新增条目
    onAdd() {
      console.log('新增条目')
      this.$refs.modal.add()
    },
    // 编辑条目
    onEdit(record) {
      console.log('编辑条目')
      this.$refs.modal.edit(record)
    },
    // 删除条目
    onDelete(record) {
      this.$confirm({
        title: '删除',
        content: `确认删除条目 “${record.dictItemName}” 吗？`,
        onOk: () => {
          return deleteDictItemByIdApi(record.id).then(() => {
            this.$message.success('删除成功')
            // 当前页数据删完了，页码-1
            this.computePageNo_mx_table(record.id)
            this.fetchPage_mx_table()
          })
        }
      })
    },
    // Overwrite 获取分页数据
    async fetchPage_mx_table() {
      if (this.first_enter_mx_table) {
        await this.getDicts(['on-off'])
      }
      if (!this.dictId) {
        this.dataSource_mx_table = []
        this.pagination_mx_table.current = 1
        this.pagination_mx_table.total = 0
        return
      }
      console.log('获取列表数据')
      this.loading_mx_table = true
      getDictItemPageApi({
        ...this.params_mx_table,
        dictId: this.dictId,
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
        dictItemCode: undefined,
        dictItemName: undefined,
        status: undefined
      }
    }
  }
}
</script>

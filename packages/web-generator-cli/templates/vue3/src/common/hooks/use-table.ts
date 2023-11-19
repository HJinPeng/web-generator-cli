import type { TablePaginationConfig } from 'ant-design-vue'
import { onMounted, onActivated, reactive, ref, type Ref } from 'vue'

interface Option {
  fetch: Function // 列表查询方法
  initParams?: Function // 初始化查询参数方法
}
export function useTable({ fetch, initParams }: Option): {
  loading: Ref<boolean>
  pagination: TablePaginationConfig
  onSearch: () => void
  onReset: () => void
  onChangeTable: (pagination: TablePaginationConfig) => void
  computePageNo: (deleteCount: number, dataCount: number) => void
} {
  // 表格加载状态
  const loading = ref<boolean>(false)

  // 分页参数
  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`
  })

  // 切换分页时
  const onChangeTable = ({ current, pageSize }: TablePaginationConfig) => {
    pagination.current = current
    pagination.pageSize = pageSize
    fetch()
  }

  // 搜索时重置页码
  const onSearch = () => {
    pagination.current = 1
    fetch()
  }

  // 重置页码&重置参数
  const onReset = () => {
    pagination.current = 1
    initParams && initParams()
    fetch()
  }

  // 删除时计算请求的页码
  const computePageNo = (deleteCount: number, dataCount: number) => {
    if (pagination.current === 1) return
    pagination.current =
      deleteCount === dataCount ? (pagination.current as number) - 1 : pagination.current
  }

  let firstEnter: boolean
  onMounted(() => {
    firstEnter = true
    fetch()
  })
  onActivated(() => {
    // 第一次进入不请求
    if (firstEnter === true) {
      firstEnter = false
      return
    }
    fetch()
  })

  return {
    loading,
    pagination,
    onSearch,
    onReset,
    onChangeTable,
    computePageNo
  }
}

// 分页接口返回结果格式
export interface Page<T> {
  current: number
  pages: number
  records: Array<T>
  size: number
  total: number
}

// 分页查询参数
export interface PageParams {
  pageNo: number | undefined
  pageSize: number | undefined
  orderBy?: string
  isAsc?: boolean
}

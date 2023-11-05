/**
 * 列表页删除时，根据 当前页数量 和 删除数量 得到请求页码
 * @author jinpengh
 *
 * @param {string} deleteIds 单条：1   多条：1,2,3
 * @param {Array} dataSource 当前表格数据
 * @param {number} pageNo 当前页码
 * @returns {number} 用于请求的页码
 */
export function computePageNo(deleteIds, dataSource, pageNo) {
  if (pageNo === 1) return 1
  const idsLen = String(deleteIds)
    .split(',')
    .filter((id) => id !== '').length
  return dataSource.length === idsLen ? pageNo - 1 : pageNo
}

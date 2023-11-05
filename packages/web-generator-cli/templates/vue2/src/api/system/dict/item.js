import http from '@/common/http'

/**
 * 获取字典条目分页列表
 * @author jinpengh
 *
 * @param {Object} params
 * @param {String} params.dictId 字典id
 * @param {String} params.dictItemCode 字典条目编码
 * @param {String} params.dictItemName 字典条目名称
 * @param {String} params.status 状态
 * @returns {*}
 */
export function getDictItemPageApi(params) {
  return http({
    url: '/dict-item/page',
    params
  })
}

/**
 * 添加字典条目
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.dictItemCode
 * @param {String} data.dictItemName
 * @param {String} params.sort 排序
 * @param {String} params.status 状态
 * @returns {*}
 */
export function addDictItemApi(data) {
  return http({
    url: '/dict-item/add',
    method: 'post',
    data
  })
}

/**
 * 编辑字典条目
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.realCode
 * @param {String} data.realname
 * @param {String} params.sort 排序
 * @param {String} params.status 状态
 * @returns {*}
 */
export function editDictItemApi(data) {
  return http({
    url: '/dict-item/edit',
    method: 'put',
    data
  })
}

/**
 * 通过id删除字典条目
 * @param {Number} id
 * @returns
 */
export function deleteDictItemByIdApi(id) {
  return http({
    url: '/dict-item/delete/' + id,
    method: 'delete'
  })
}

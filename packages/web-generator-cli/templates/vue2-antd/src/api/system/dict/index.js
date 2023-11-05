import http from '@/common/http'

/**
 * 获取字典分页列表
 * @author jinpengh
 *
 * @param {Object} params
 * @param {String} params.dictCode 字典编码
 * @param {String} params.dictName 字典名称
 * @param {String} params.status 状态
 * @returns {*}
 */
export function getDictPageApi(params) {
  return http({
    url: '/dict/page',
    params
  })
}

/**
 * 添加字典
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.dictCode
 * @param {String} data.dictName
 * @param {String} data.status
 * @returns {*}
 */
export function addDictApi(data) {
  return http({
    url: '/dict/add',
    method: 'post',
    data
  })
}

/**
 * 编辑字典
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.realCode
 * @param {String} data.realname
 * @param {String} data.status
 * @returns {*}
 */
export function editDictApi(data) {
  return http({
    url: '/dict/edit',
    method: 'put',
    data
  })
}

/**
 * 通过id删除字典
 * @param {Number} id
 * @returns
 */
export function deleteDictByIdApi(id) {
  return http({
    url: '/dict/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取字典编码对应的字典值
 * @author jinpengh
 *
 * @param {String} code 字典编码
 * @returns {*}
 */
export function getDictByCodeApi(code) {
  return http({
    url: '/dict/get',
    params: {
      code
    }
  })
}

/**
 * 批量获取字典编码对应的字典值
 * @author jinpengh
 *
 * @param {String} codes 字典编码用逗号分隔
 * @returns {*}
 */
export function getDictByCodesApi(codes) {
  return http({
    url: '/dict/batch',
    params: {
      codes
    }
  })
}

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
  /*
  return http({
    url: '/dict-item/page',
    params
  })
  */
  return Promise.resolve({
    current: 1,
    size: 10,
    pages: 1,
    records: [
      {
        id: 36,
        dictId: 10,
        dictItemCode: '0',
        dictItemName: '否',
        sort: 1,
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 22:24:14',
        updateByName: null,
        updateDateTime: null
      },
      {
        id: 37,
        dictId: 10,
        dictItemCode: '1',
        dictItemName: '是',
        sort: 10,
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 22:24:22',
        updateByName: null,
        updateDateTime: null
      }
    ],
    total: 2
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

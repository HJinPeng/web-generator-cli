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
  /*
  return http({
    url: '/dict/page',
    params
  })
  */
  return Promise.resolve({
    current: 1,
    size: 10,
    pages: 1,
    records: [
      {
        id: 10,
        dictCode: 'external-link',
        dictName: '是否外链',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 22:24:02',
        updateByName: null,
        updateDateTime: null
      },
      {
        id: 9,
        dictCode: 'keep-alive',
        dictName: '页面缓存',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 22:21:20',
        updateByName: null,
        updateDateTime: null
      },
      {
        id: 8,
        dictCode: 'show-hide',
        dictName: '菜单显示隐藏',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 22:20:11',
        updateByName: null,
        updateDateTime: null
      },
      {
        id: 7,
        dictCode: 'layout',
        dictName: '前端布局',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 22:10:12',
        updateByName: null,
        updateDateTime: null
      },
      {
        id: 6,
        dictCode: 'menu-btn',
        dictName: '菜单按钮类型',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-01 21:57:48',
        updateByName: null,
        updateDateTime: null
      },
      {
        id: 5,
        dictCode: 'on-off',
        dictName: '开关状态',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-10-28 19:54:36',
        updateByName: null,
        updateDateTime: null
      }
    ],
    total: 6
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
  /*
  return http({
    url: '/dict/batch',
    params: {
      codes
    }
  })
  */
  return Promise.resolve({
    'menu-btn': [
      {
        dictCode: 'menu-btn',
        dictName: '菜单按钮类型',
        dictItemCode: 'menu',
        dictItemName: '菜单'
      },
      {
        dictCode: 'menu-btn',
        dictName: '菜单按钮类型',
        dictItemCode: 'btn',
        dictItemName: '按钮'
      }
    ],
    'on-off': [
      {
        dictCode: 'on-off',
        dictName: '开关状态',
        dictItemCode: '1',
        dictItemName: '启用'
      },
      {
        dictCode: 'on-off',
        dictName: '开关状态',
        dictItemCode: '2',
        dictItemName: '禁用'
      }
    ]
  })
}

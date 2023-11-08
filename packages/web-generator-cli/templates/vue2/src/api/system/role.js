import http from '@/common/http'

/**
 * 获取角色分页列表
 * @author jinpengh
 *
 * @param {Object} params
 * @param {String} params.roleCode 角色编码
 * @param {String} params.roleName 角色名称
 * @param {String} params.status 状态
 * @returns {*}
 */
export function getRolePageApi(params) {
  /*
  return http({
    url: '/role/page',
    params
  })
  */
  return Promise.resolve({
    current: 1,
    size: 10,
    pages: 1,
    records: [
      {
        roleCode: 'test1',
        roleName: '测试角色1',
        status: '1',
        id: 3,
        createByName: '管理员',
        createDateTime: '2023-11-02 14:14:43',
        updateByName: null,
        updateDateTime: null
      },
      {
        roleCode: 'admin',
        roleName: '管理员',
        status: '1',
        id: 2,
        createByName: '管理员',
        createDateTime: '2023-10-26 00:10:46',
        updateByName: null,
        updateDateTime: null
      }
    ],
    total: 2
  })
}

/**
 * 获取所有角色
 * @author jinpengh
 *
 * @export
 * @returns {*}
 */
export function getAllRoleApi() {
  /*
  return http({
    url: '/role/all'
  })
  */
  return Promise.resolve([
    {
      id: 2,
      roleCode: 'admin',
      roleName: '管理员',
      status: '1',
      createBy: 'admin',
      createByName: '管理员',
      createDateTime: '2023-10-25T16:10:46.000Z',
      updateBy: null,
      updateByName: null,
      updateDateTime: null,
      deleted: 0
    },
    {
      id: 3,
      roleCode: 'test1',
      roleName: '测试角色1',
      status: '1',
      createBy: 'admin',
      createByName: '管理员',
      createDateTime: '2023-11-02T06:14:43.000Z',
      updateBy: null,
      updateByName: null,
      updateDateTime: null,
      deleted: 0
    }
  ])
}

/**
 * 添加角色
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.roleCode
 * @param {String} data.roleName
 * @returns {*}
 */
export function addRoleApi(data) {
  return http({
    url: '/role/add',
    method: 'post',
    data
  })
}

/**
 * 编辑角色
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.realCode
 * @param {String} data.realname
 * @returns {*}
 */
export function editRoleApi(data) {
  return http({
    url: '/role/edit',
    method: 'put',
    data
  })
}

/**
 * 通过id删除角色
 * @param {Number} id
 * @returns
 */
export function deleteRoleByIdApi(id) {
  return http({
    url: '/role/delete/' + id,
    method: 'delete'
  })
}

/**
 * 更新角色对应的菜单
 * @author jinpengh
 *
 * @param {Object} data
 * @param {Number} data.roleId
 * @param {Number[]} data.menus
 * @returns {*}
 */
export function updateRoleMenusApi(data) {
  return http({
    url: '/role/set-menus',
    method: 'put',
    data
  })
}

/**
 * 获取角色对应的菜单id
 * @author jinpengh
 *
 * @param {Number} roleId
 * @returns {*}
 */
export function getRoleMenusApi(roleId) {
  /*
  return http({
    url: '/role/get-menus/' + roleId
  })
  */
  return Promise.resolve([3, 4, 14, 2, 18, 16, 15, 17, 19, 1])
}

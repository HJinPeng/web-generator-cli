import http from '@/common/http'

/**
 * 登录：账号密码
 * @author jinpengh
 *
 * @param {Object} params
 * @param {String} params.account 账号
 * @param {String} params.password 密码
 * @returns {Promise<Object>}
 */
export function loginApi(data) {
  /*
  return http({
    url: '/login',
    method: 'post',
    data
  })
  */
  return Promise.resolve({
    id: 10,
    account: 'admin',
    realname: '管理员',
    email: null,
    phone: null,
    profilePhoto: null,
    sex: '0',
    status: '1',
    token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJhY2NvdW50IjoiYWRtaW4iLCJyZWFsbmFtZSI6IueuoeeQhuWRmCIsInJvbGVzIjpbeyJpZCI6Miwicm9sZUNvZGUiOiJhZG1pbiIsInJvbGVOYW1lIjoi566h55CG5ZGYIiwic3RhdHVzIjoiMSJ9XSwiaWF0IjoxNjk5NDUxMzA1fQ.PqxPfqAt__3_vBU3-hsH131bCprSiWbqhBPTgZYk7gE',
    roles: [
      {
        id: 2,
        roleCode: 'admin',
        roleName: '管理员',
        status: '1'
      }
    ]
  })
}

/**
 * 获取用户权限：菜单，权限码
 * @author jinpengh
 *
 * @returns {Promise<Object>}
 */
export function getUserPermissionApi() {
  /*
  return http({
    url: '/queryUserMenuPermission'
  })
  */

  return Promise.resolve({
    menus: [
      {
        id: 1,
        permissionType: 'menu',
        permissionName: '系统管理',
        menuCode: null,
        permissionCode: null,
        permissionLevel: null,
        icon: 'setting',
        layout: null,
        ranking: null,
        hiddenMenu: null,
        keepAlive: null,
        externalLink: null,
        externalLinkContent: null,
        status: '1',
        parentId: null,
        deleted: 0,
        createBy: null,
        createByName: null,
        updateBy: null,
        updateByName: null,
        createDateTime: null,
        updateDateTime: null,
        comment: null,
        children: [
          {
            id: 2,
            permissionType: 'menu',
            permissionName: '菜单管理',
            menuCode: 'MenuManagement',
            permissionCode: null,
            permissionLevel: null,
            icon: 'menu',
            layout: 'LayoutHeaderSidebar',
            ranking: 1,
            hiddenMenu: '0',
            keepAlive: '0',
            externalLink: '0',
            externalLinkContent: null,
            status: '1',
            parentId: 1,
            deleted: 0,
            createBy: null,
            createByName: null,
            updateBy: 'admin',
            updateByName: '管理员',
            createDateTime: null,
            updateDateTime: '2023-11-02T14:00:54.000Z',
            comment: null
          },
          {
            id: 4,
            permissionType: 'menu',
            permissionName: '角色管理',
            menuCode: 'RoleManagement',
            permissionCode: null,
            permissionLevel: null,
            icon: 'crown',
            layout: 'LayoutHeaderSidebar',
            ranking: 5,
            hiddenMenu: '0',
            keepAlive: '0',
            externalLink: '0',
            externalLinkContent: null,
            status: '1',
            parentId: 1,
            deleted: 0,
            createBy: null,
            createByName: null,
            updateBy: 'admin',
            updateByName: '管理员',
            createDateTime: null,
            updateDateTime: '2023-11-02T13:59:35.000Z',
            comment: null
          },
          {
            id: 3,
            permissionType: 'menu',
            permissionName: '用户管理',
            menuCode: 'UserManagement',
            permissionCode: null,
            permissionLevel: null,
            icon: 'user',
            layout: 'LayoutHeaderSidebar',
            ranking: 10,
            hiddenMenu: '0',
            keepAlive: '0',
            externalLink: '0',
            externalLinkContent: null,
            status: '1',
            parentId: 1,
            deleted: 0,
            createBy: null,
            createByName: null,
            updateBy: 'admin',
            updateByName: '管理员',
            createDateTime: null,
            updateDateTime: '2023-11-02T14:01:51.000Z',
            comment: null
          },
          {
            id: 14,
            permissionType: 'menu',
            permissionName: '字典管理',
            menuCode: 'DictManagement',
            permissionCode: null,
            permissionLevel: null,
            icon: 'book',
            layout: 'LayoutHeaderSidebar',
            ranking: 15,
            hiddenMenu: '0',
            keepAlive: '0',
            externalLink: '0',
            externalLinkContent: null,
            status: '1',
            parentId: 1,
            deleted: 0,
            createBy: null,
            createByName: null,
            updateBy: null,
            updateByName: null,
            createDateTime: null,
            updateDateTime: null,
            comment: null
          }
        ]
      }
    ]
  })
}

/**
 * 根据token获取用户信息
 * @author jinpengh
 *
 * @returns {Promise<Object>}
 */
export function getUserInfoApi() {
  /*
  return http({
    url: '/getUserInfo'
  })
  */
  return Promise.resolve({
    id: 10,
    account: 'admin',
    realname: '管理员',
    email: null,
    phone: null,
    profilePhoto: null,
    sex: '0',
    status: '1',
    roles: [
      {
        id: 2,
        roleCode: 'admin',
        roleName: '管理员',
        status: '1'
      }
    ]
  })
}

/**
 * 退出登录
 * @author jinpengh
 *
 * @export
 * @returns {Promise<String>}
 */
export function logoutApi() {
  return http({
    url: '/logout',
    method: 'get'
  })
}

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
  // return http({
  //   url: 'base/user/auth/login',
  //   params,
  //   module: 'mock'
  // })
  return http({
    url: '/login',
    method: 'post',
    data
  })
  // return Promise.resolve({
  //   phone: '18149511205',
  //   oaStatus: 'aute culpa laboris in ad',
  //   birthday: '1992-02-18',
  //   account: 'velit',
  //   roles: [
  //     {
  //       deleted: true,
  //       comment: 'irure in voluptate',
  //       status: 'deserunt Ut consectetur',
  //       id: 49,
  //       updateByName: '心大严义取干',
  //       roleName: '回空局织',
  //       updateDateTime: '1994-08-28 18:09:01',
  //       updateBy: 'officia aliqua Lorem in',
  //       roleCode: '14',
  //       createDateTime: '2020-06-09 11:01:43',
  //       createBy: 'quis dolore',
  //       createByName: '她系拉一件位难'
  //     },
  //     {
  //       updateBy: 'laborum sed ea',
  //       status: 'laborum qui velit proident',
  //       updateByName: '长式么',
  //       createDateTime: '2021-06-03 05:36:52',
  //       comment: 'aute',
  //       deleted: false,
  //       updateDateTime: '2004-10-20 04:57:58',
  //       createByName: '数照马经',
  //       id: 4,
  //       roleCode: '38',
  //       roleName: '民些分想维',
  //       createBy: 'minim anim consequat occaecat exercitation'
  //     },
  //     {
  //       comment: 'proident',
  //       updateBy: 'Ut laborum fugiat nulla eiusmod',
  //       updateByName: '前石整处作',
  //       createByName: '们产己省包再光',
  //       createDateTime: '2012-09-27 05:20:35',
  //       id: 42,
  //       roleCode: '6',
  //       status: 'laboris commodo nostrud velit laborum',
  //       createBy: 'cillum labore',
  //       deleted: false,
  //       updateDateTime: '2016-06-19 20:40:28',
  //       roleName: '的技情'
  //     }
  //   ],
  //   organizationCode: '17',
  //   id: 55,
  //   email: 'n.texhc@qq.com',
  //   realname: '参用华专调',
  //   token: 'sunt anim culpa eiusmod',
  //   organizationName: '话回较因划',
  //   status: 27,
  //   profilePhoto: 'http://dummyimage.com/400x400',
  //   sex: 97
  // })
}

/**
 * 获取用户权限：菜单，权限码
 * @author jinpengh
 *
 * @returns {Promise<Object>}
 */
export function getUserPermissionApi() {
  return http({
    url: '/queryUserMenuPermission'
  })

  // return Promise.resolve({
  //   menus: [
  //     {
  //       id: 1,
  //       title: '系统管理',
  //       permissionName: '系统管理',
  //       permissionType: 'menu',
  //       menuCode: null,
  //       layout: null,
  //       icon: 'setting',
  //       permissionCode: '',
  //       hiddenMenu: null,
  //       keepAlive: null,
  //       externalLink: null,
  //       status: 'enable',
  //       children: [
  //         {
  //           id: 18,
  //           permissionName: '菜单管理',
  //           permissionType: 'menu',
  //           menuCode: 'MenuManagement',
  //           layout: 'LayoutHeaderSidebar',
  //           icon: 'menu',
  //           hiddenMenu: null,
  //           keepAlive: true,
  //           externalLink: null,
  //           status: 'enable',
  //           permissionCode: ''
  //         },
  //         {
  //           id: 11,
  //           title: '用户管理',
  //           permissionName: '用户管理',
  //           permissionType: 'menu',
  //           menuCode: 'UserManagement',
  //           layout: 'LayoutHeaderSidebar',
  //           icon: 'user',
  //           hiddenMenu: null,
  //           keepAlive: true,
  //           externalLink: null,
  //           status: 'enable',
  //           permissionCode: '',
  //           children: [
  //             {
  //               id: 111,
  //               permissionName: '用户详情',
  //               permissionType: 'menu',
  //               menuCode: 'UserDetail',
  //               layout: 'LayoutHeaderSidebar',
  //               icon: 'menu',
  //               hiddenMenu: true,
  //               keepAlive: true,
  //               externalLink: null,
  //               status: 'enable',
  //               permissionCode: ''
  //             }
  //           ]
  //         },
  //         {
  //           id: 14,
  //           permissionName: '角色管理',
  //           permissionType: 'menu',
  //           menuCode: 'RoleManagement',
  //           layout: 'LayoutHeaderSidebar',
  //           icon: 'crown',
  //           hiddenMenu: null,
  //           keepAlive: false,
  //           externalLink: null,
  //           status: 'enable',
  //           permissionCode: ''
  //         },
  //         {
  //           id: 13,
  //           title: '字典管理',
  //           permissionName: '字典管理',
  //           permissionType: 'menu',
  //           menuCode: 'DictManagement',
  //           layout: 'LayoutHeaderSidebar',
  //           icon: 'book',
  //           hiddenMenu: null,
  //           keepAlive: false,
  //           externalLink: null,
  //           status: 'enable',
  //           permissionCode: ''
  //         }
  //       ]
  //     }
  //   ]
  // })
}

/**
 * 根据token获取用户信息
 * @author jinpengh
 *
 * @returns {Promise<Object>}
 */
export function getUserInfoApi() {
  // return http({
  //   url: '/base/user/auth/getLoginUser',
  //   module: 'mock'
  // })
  return http({
    url: '/getUserInfo'
  })
  // return Promise.resolve({
  //   organizationName: '正就清',
  //   email: 'g.eitutlbow@qq.com',
  //   realname: '参用华专调',
  //   roles: [
  //     {
  //       updateBy: 'magna',
  //       deleted: true,
  //       createByName: '口适完',
  //       updateDateTime: '2018-04-28 04:17:26',
  //       updateByName: '目共别其见',
  //       status: 'Excepteur exercitation tempor laboris est',
  //       roleCode: '9',
  //       createBy: 'minim anim ex',
  //       roleName: '管理员',
  //       id: 8,
  //       comment: 'adipisicing',
  //       createDateTime: '2003-10-14 04:58:59'
  //     }
  //   ],
  //   account: 'admin',
  //   phone: '18172317172',
  //   id: 18,
  //   token: 'sdlfkjasdfjalnasndfasjdlkfjslkfjslkdjfsd',
  //   sex: 85,
  //   birthday: '1989-09-28',
  //   status: 1,
  //   profilePhoto: 'http://dummyimage.com/400x400',
  //   oaStatus: 'nostrud',
  //   organizationCode: '77'
  // })
}

/**
 * 退出登录
 * @author jinpengh
 *
 * @export
 * @returns {Promise<String>}
 */
export function logoutApi() {
  // return http({
  //   url: 'base/user/auth/logout',
  //   method: 'put'
  // })
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject('no')
  //   }, 3000)
  // })
  return Promise.resolve('no')
}

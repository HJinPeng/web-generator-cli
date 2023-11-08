import http from '@/common/http'

/**
 * 获取用户分页列表
 * @author jinpengh
 *
 * @param {Object} params
 * @param {String} params.account 账号
 * @param {String} params.realname 用户名
 * @param {String} params.status 状态
 * @returns {*}
 */
export function getUserPageApi(params) {
  /*
  return http({
    url: '/user/page',
    params
  })
  */
  return Promise.resolve({
    current: 1,
    size: 10,
    pages: 1,
    records: [
      {
        id: 20,
        account: 'test1',
        realname: '测试用户12',
        email: null,
        phone: null,
        profilePhoto: null,
        sex: '0',
        status: '1',
        createByName: '管理员',
        createDateTime: '2023-11-02 15:38:29',
        updateByName: '管理员',
        updateDateTime: '2023-11-03 08:28:29'
      },
      {
        id: 10,
        account: 'admin',
        realname: '管理员',
        email: null,
        phone: null,
        profilePhoto: null,
        sex: '0',
        status: '1',
        createByName: '三年磨一剑',
        createDateTime: '2023-10-25 22:02:32',
        updateByName: '测试用户1',
        updateDateTime: '2023-11-02 17:56:34'
      }
    ],
    total: 2
  })
}

/**
 * 添加用户
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.account
 * @param {String} data.realname
 * @returns {*}
 */
export function addUserApi(data) {
  return http({
    url: '/user/add',
    method: 'post',
    data
  })
}

/**
 * 编辑用户
 * @author jinpengh
 *
 * @export
 * @param {Object} data
 * @param {String} data.realname
 * @returns {*}
 */
export function editUserApi(data) {
  return http({
    url: '/user/edit',
    method: 'put',
    data
  })
}

/**
 * 通过id删除用户
 * @param {Number} id
 * @returns
 */
export function deleteUserByIdApi(id) {
  return http({
    url: '/user/delete/' + id,
    method: 'delete'
  })
}

/**
 * 根据用户id 获取用户详情
 * @param {Number} userId
 * @returns
 */
export function getUserDetailApi(userId) {
  return http({
    url: '/user/detail/' + userId
  })
}

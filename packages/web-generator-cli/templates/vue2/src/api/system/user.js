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
  return http({
    url: '/user/page',
    params
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

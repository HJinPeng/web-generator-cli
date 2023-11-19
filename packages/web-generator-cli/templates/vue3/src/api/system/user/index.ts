import http from '@/common/http'
import type { AddUserParams, EditUserParams, User, UserPageParams } from './types'
import type { Page, PageParams } from '@/api/common-types'

// 获取用户分页列表
export function getUserPageApi(params: UserPageParams & PageParams) {
  /*
  return http<Page<User>>({
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
  } as Page<User>)
}

// 添加用户
export function addUserApi(data: AddUserParams) {
  return http({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 编辑用户
export function editUserApi(data: EditUserParams) {
  return http({
    url: '/user/edit',
    method: 'put',
    data
  })
}

// 通过id删除用户
export function deleteUserByIdApi(id: number) {
  return http({
    url: '/user/delete/' + id,
    method: 'delete'
  })
}

// 根据用户id 获取用户详情
export function getUserDetailApi(userId: number) {
  return http<User & { roles: number[] }>({
    url: '/user/detail/' + userId
  })
}

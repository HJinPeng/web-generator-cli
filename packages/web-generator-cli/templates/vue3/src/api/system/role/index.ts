import http from '@/common/http'
import type { AddRoleParams, EditRoleParams, Role, RolePageParams } from './types'
import type { Page, PageParams } from '@/api/common-types'

// 获取角色分页列表
export function getRolePageApi(params: RolePageParams & PageParams) {
  /*
  return http<Page<Role>>({
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
  } as Page<Role>)
}

// 获取所有角色
export function getAllRoleApi() {
  /*
  return http<Role[]>({
    url: '/role/all'
  })
  */
  return Promise.resolve([
    {
      id: 2,
      roleCode: 'admin',
      roleName: '管理员',
      status: '1',
      // createBy: 'admin',
      createByName: '管理员',
      createDateTime: '2023-10-25T16:10:46.000Z',
      // updateBy: null,
      updateByName: null,
      updateDateTime: null,
      // deleted: 0
    },
    {
      id: 3,
      roleCode: 'test1',
      roleName: '测试角色1',
      status: '1',
      // createBy: 'admin',
      createByName: '管理员',
      createDateTime: '2023-11-02T06:14:43.000Z',
      // updateBy: null,
      updateByName: null,
      updateDateTime: null,
      // deleted: 0
    }
  ] as Role[])
}

// 添加角色
export function addRoleApi(data: AddRoleParams) {
  return http({
    url: '/role/add',
    method: 'post',
    data
  })
}

// 编辑角色
export function editRoleApi(data: EditRoleParams) {
  return http({
    url: '/role/edit',
    method: 'put',
    data
  })
}

// 通过id删除角色
export function deleteRoleByIdApi(id: number) {
  return http({
    url: '/role/delete/' + id,
    method: 'delete'
  })
}

// 更新角色对应的菜单
export function updateRoleMenusApi(data: { roleId: number; menus: number[] }) {
  return http({
    url: '/role/set-menus',
    method: 'put',
    data
  })
}

// 获取角色对应的菜单id
export function getRoleMenusApi(roleId: number) {
  /*
  return http<number[]>({
    url: '/role/get-menus/' + roleId
  })
  */
  return Promise.resolve([3, 4, 14, 2, 18, 16, 15, 17, 19, 1])
}

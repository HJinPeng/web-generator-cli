import http from '@/common/http'

/**
 * 获取所有菜单
 * @author jinpengh
 *
 * @returns {*}
 */
export function getAllMenuApi() {
  return http({
    url: '/menu/all-menu'
  })
}

export function addMenuApi(data) {
  return http({
    url: '/menu/add',
    method: 'post',
    data
  })
}

export function editMenuApi(data) {
  return http({
    url: '/menu/edit',
    method: 'put',
    data
  })
}

export function deleteMenuApi(id) {
  return http({
    url: '/menu/delete/' + id,
    method: 'delete'
  })
}

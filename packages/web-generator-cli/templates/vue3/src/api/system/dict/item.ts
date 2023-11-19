import http from '@/common/http'
import type { AddDictItemParams, DictItem, DictItemPageParams, EditDictItemParams } from './types'
import type { Page, PageParams } from '@/api/common-types'

// 获取字典条目分页列表
export function getDictItemPageApi(params: DictItemPageParams & PageParams) {
  /*
  return http<Page<DictItem>>({
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
  } as Page<DictItem>)
}

// 添加字典条目
export function addDictItemApi(data: AddDictItemParams) {
  return http({
    url: '/dict-item/add',
    method: 'post',
    data
  })
}

// 编辑字典条目
export function editDictItemApi(data: EditDictItemParams) {
  return http({
    url: '/dict-item/edit',
    method: 'put',
    data
  })
}

// 通过id删除字典条目
export function deleteDictItemByIdApi(id: number) {
  return http({
    url: '/dict-item/delete/' + id,
    method: 'delete'
  })
}

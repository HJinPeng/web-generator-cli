import http from '@/common/http'
import type {
  AddDictCategoryParams,
  DictCategory,
  DictCategoryPageParams,
  DictItem,
  EditDictCategoryParams
} from './types'
import type { Page, PageParams } from '@/api/common-types'

// 获取字典分页列表
export function getDictPageApi(params: DictCategoryPageParams & PageParams) {
  /*
  return http<Page<DictCategory>>({
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
  } as Page<DictCategory>)
}

// 添加字典
export function addDictApi(data: AddDictCategoryParams) {
  return http({
    url: '/dict/add',
    method: 'post',
    data
  })
}

// 编辑字典
export function editDictApi(data: EditDictCategoryParams) {
  return http({
    url: '/dict/edit',
    method: 'put',
    data
  })
}

// 通过id删除字典
export function deleteDictByIdApi(id: number) {
  return http({
    url: '/dict/delete/' + id,
    method: 'delete'
  })
}

// 获取字典编码对应的字典值
export function getDictByCodeApi(code: string) {
  /*
  return http<DictItem[]>({
    url: '/dict/get',
    params: {
      code
    }
  })
  */
  return Promise.resolve([
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
  ] as Array<Pick<DictCategory, 'dictCode' | 'dictName'> & Pick<DictItem, 'dictItemCode' | 'dictItemName'>>)
}

// 批量获取字典编码对应的字典值
export function getDictByCodesApi(codes: string) {
  /*
  return http<Record<string, DictItem[]>>({
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
  } as Record<string, Array<Pick<DictCategory, 'dictCode' | 'dictName'> & Pick<DictItem, 'dictItemCode' | 'dictItemName'>>>)
}

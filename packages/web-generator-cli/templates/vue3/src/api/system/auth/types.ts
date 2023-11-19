import type { LayoutType } from '@/components/app-layout'

// 登录参数
export interface LoginParams {
  account: string
  password: string
}

// 用户信息
export interface UserInfo {
  id: number
  account: string
  realname: string
  email: string | null
  phone: string | null
  profilePhoto: string | null
  sex?: '0' | '1' | '2' // 0-默认未知,1-男,2-女
  status: '1' | '2' // 1正常 2禁用
  token: string
  roles: Array<{
    id: number
    roleCode: string
    roleName: string
    status: '1' | '2' //1正常 2禁用
  }>
}

// 菜单权限信息
export interface Permission {
  id: number
  permissionType: 'menu' | 'btn'
  permissionName: string
  menuCode?: string
  permissionCode?: string
  permissionLevel?: number
  icon?: string
  layout?: LayoutType
  ranking?: number
  hiddenMenu?: '0' | '1' // 1—隐藏 0—显示
  keepAlive?: '0' | '1' // 1—缓存 0—不缓存
  externalLink?: '0' | '1' // 1—外链 0 —非外链
  externalLinkContent?: string
  status: '1' | '2' // 1—启用 2—禁用
  parentId?: number
  deleted: 0 | 1 // 1—删除 0—正常
  createBy?: string
  createByName?: string
  updateBy?: string
  updateByName?: string
  createDateTime?: string
  updateDateTime?: string
  comment?: string
  children?: Array<Permission>
}

// 用户权限信息
export interface UserPermission {
  menus: Array<Permission>
}

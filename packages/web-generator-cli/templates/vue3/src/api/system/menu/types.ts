import type { Permission } from '../auth/types'

export interface AddMenuParams
  extends Pick<
    Permission,
    | 'permissionType'
    | 'permissionName'
    | 'menuCode'
    | 'icon'
    | 'ranking'
    | 'permissionCode'
    | 'layout'
    | 'hiddenMenu'
    | 'layout'
    | 'hiddenMenu'
    | 'keepAlive'
    | 'externalLink'
    | 'externalLinkContent'
    | 'status'
    | 'parentId'
  > {}

export interface EditMenuParams extends AddMenuParams {
  id: number
}

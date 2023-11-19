export interface RolePageParams {
  roleCode: string | undefined
  roleName: string | undefined
  status: '1' | '2' | undefined //1正常 2禁用
}

export interface Role {
  id: number
  roleCode: string
  roleName: string
  status: '1' | '2' //1正常 2禁用
  createByName: string
  createDateTime: string
  updateByName: string | null
  updateDateTime: string | null
}

export interface AddRoleParams {
  roleCode: string
  roleName: string
  status: '1' | '2' //1正常 2禁用
}

export interface EditRoleParams extends AddRoleParams {
  id: number
}

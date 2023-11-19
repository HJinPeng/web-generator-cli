export interface UserPageParams {
  account: string | undefined
  realname: string | undefined
  status: '1' | '2' | undefined //1正常 2禁用
}

export interface User {
  id: number
  account: string
  realname: string
  status: '1' | '2'
  sex: '0' | '1' | '2' // 0-未知 1-男 2-女
  phone: string | null
  email: string | null
  profilePhoto: string | null
  createByName: string
  createDateTime: string
  updateByName: string | null
  updateDateTime: string | null
}

export interface AddUserParams {
  account: string
  realname: string
  roles: number[]
  status: '1' | '2'
}

export interface EditUserParams extends AddUserParams {
  id: number
}

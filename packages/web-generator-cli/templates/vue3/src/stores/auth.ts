import { ref } from 'vue'
import { defineStore } from 'pinia'
import { setStorageItem } from '@/common/storage'
import { normalizeMenus, addRoutes, type MenuType, type AllMenu } from '@/common/utils/menu-route'
import { loginApi, getUserPermissionApi, getUserInfoApi, logoutApi } from '@/api/system/auth'
import type { LoginParams, UserInfo } from '@/api/system/auth/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo>()
  const menu = ref<Array<MenuType>>([])
  const allMenu = ref<AllMenu>({})

  function setToken(_token: string) {
    setStorageItem('token', _token)
    token.value = _token
  }

  function setUserInfo(_userInfo: UserInfo) {
    userInfo.value = _userInfo
  }

  function setMenu(_menu: Array<MenuType>) {
    menu.value = _menu
  }

  function setAllMenu(_allMenu: AllMenu) {
    allMenu.value = _allMenu
  }

  function clearAuth() {
    token.value = ''
    userInfo.value = undefined
    menu.value = []
    allMenu.value = {}
  }

  async function getUserPermission() {
    const { menus } = await getUserPermissionApi()
    const { allMenu, sidebarMenus, routes } = normalizeMenus(menus)
    setAllMenu(allMenu)
    setMenu(sidebarMenus)
    addRoutes(routes)
  }

  async function login(loginParams: LoginParams) {
    const _userInfo = await loginApi(loginParams)
    setToken(_userInfo.token)
    setUserInfo(_userInfo)
    await getUserPermission()
  }

  async function getUserInfo() {
    const _userInfo = await getUserInfoApi()
    setUserInfo(_userInfo)
  }

  async function logout(needRequest: boolean = true) {
    needRequest && (await logoutApi())
    clearAuth()
  }

  return {
    token,
    userInfo,
    menu,
    allMenu,
    setToken,
    clearAuth,
    getUserPermission,
    login,
    getUserInfo,
    logout
  }
})

import { loginApi, getUserPermissionApi, getUserInfoApi, logoutApi } from '@/api/system/auth'
import { setStorageItem } from '@/common/storage'
import { TOKEN } from '@/common/storage/storage-key'
import { normalizeMenus, addRoutes } from '@/common/utils/menu-route'

export default {
  state: {
    token: '',
    userInfo: {},
    menu: [], // 侧边菜单
    allMenu: {} // 所有菜单
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      setStorageItem(TOKEN, token)
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenu(state, menu) {
      state.menu = menu
    },
    setAllMenu(state, allMenu) {
      state.allMenu = allMenu
    },
    clearAuth(state) {
      state.token = ''
      state.userInfo = {}
      state.menu = []
      state.allMenu = {}
    }
  },
  actions: {
    /**
     * 登录
     * @author jinpengh
     *
     * @async
     * @param {{ dispatch: any; commit: any; }} param0
     * @param {*} param0.dispatch
     * @param {*} param0.commit
     * @param {Object} payload
     * @param {String} payload.account 账号
     * @param {String} payload.password 密码
     * @returns {Promise<Object>}
     */
    async login({ dispatch, commit }, payload) {
      const userInfo = await loginApi(payload)
      // 存储token
      commit('setToken', userInfo.token)
      delete userInfo.token
      // 存储用户信息
      commit('setUserInfo', userInfo)
      // 请求权限信息
      await dispatch('getUserPermission')
    },

    /**
     * 获取用户权限信息：菜单，权限码
     * @author jinpengh
     *
     * @async
     * @param {{ commit: any; }} param0
     * @param {*} param0.commit
     * @returns {Promise}
     */
    async getUserPermission({ commit }) {
      const { menus, permissions } = await getUserPermissionApi()
      const { allMenu, sidebarMenus, routes } = normalizeMenus(menus)
      // 记录所有菜单
      commit('setAllMenu', allMenu)
      // 添加侧边菜单
      commit('setMenu', sidebarMenus)
      // 动态添加路由
      addRoutes(routes)
    },

    /**
     * 根据token获取用户信息
     * @author jinpengh
     *
     * @async
     * @param {{ commit: any; }} param0
     * @param {*} param0.commit
     * @returns {Promise}
     */
    async getUserInfo({ commit }) {
      const userInfo = await getUserInfoApi()
      // 存储用户信息
      commit('setUserInfo', userInfo)
    },

    /**
     * 根据token退出登录，并清空store
     * @param {*} param0
     */
    async logout({ dispatch }, needRequest = true) {
      needRequest && (await logoutApi())
      dispatch('clearStore')
    }
  }
}

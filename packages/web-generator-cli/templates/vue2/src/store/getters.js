export default {
  Token: (state) => state.auth.token,
  UserInfo: (state) => state.auth.userInfo,
  Menu: (state) => state.auth.menu,
  AllMenu: (state) => state.auth.allMenu,
  Roles: (state) => state.auth.userInfo?.roles || [],
  ViewStack: (state) => state.viewStack.viewStack || [],
  Translate: (state, getters) => getters.translateDictItem
}

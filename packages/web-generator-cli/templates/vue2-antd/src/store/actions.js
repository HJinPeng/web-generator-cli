import { clearStorage } from '@/common/storage'

export default {
  /**
   * 清空 vuex 和 localstorage
   * @author jinpengh
   *
   * @param {{ commit: any; }} param0
   * @param {*} param0.commit
   */
  clearStore({ commit }) {
    commit('clearAuth')
    clearStorage()
  }
}

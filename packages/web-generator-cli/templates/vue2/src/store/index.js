import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import auth from './modules/auth'
import viewStack from './modules/view-stack'
import dict from './modules/dict'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions,
  modules: {
    auth,
    viewStack,
    dict
  }
})

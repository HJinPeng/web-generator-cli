import { getDictByCodeApi, getDictByCodesApi } from '@/api/system/dict'
import { setStorageItem, getStorageItem } from '@/common/storage'
import { DICT } from '@/common/storage/storage-key'
export default {
  state: {
    dict: JSON.parse(getStorageItem(DICT) || '{}')
  },
  getters: {
    translateDictItem: (state) => (dictCode, dictItemCode) => {
      if (!dictCode || !dictItemCode) return ''
      return (
        state.dict[dictCode]?.find((item) => item.dictItemCode === dictItemCode)?.dictItemName || ''
      )
    }
  },
  mutations: {
    setDict(state, info) {
      state.dict[info.dictCode] = info.dictItems
      setStorageItem(DICT, JSON.stringify(state.dict))
    },
    clearDict(state) {
      state.dict = {}
    }
  },
  actions: {
    async getDict({ commit, state }, dictCode) {
      const dict = state.dict[dictCode]
      if (!dict || !dict.length) {
        const result = await getDictByCodeApi(dictCode)
        commit('setDict', { dictCode, dictItems: result })
        return result
      } else {
        return dict
      }
    },
    async getDicts({ commit, state }, dictCodeArr = []) {
      let resArr = new Array(dictCodeArr.length).fill([])
      let dictMap = {}
      dictCodeArr.forEach((dictCode, index) => {
        if (state.dict[dictCode]) {
          resArr[index] = state.dict[dictCode]
        } else {
          dictMap[dictCode] = index
        }
      })
      const needFetchDict = Object.keys(dictMap)
      if (needFetchDict.length) {
        const result = await getDictByCodesApi(needFetchDict.join(','))
        Object.keys(result).forEach((dictCode) => {
          commit('setDict', { dictCode, dictItems: result[dictCode] })
          resArr[dictMap[dictCode]] = result[dictCode]
        })
        return resArr
      } else {
        return resArr
      }
    }
  }
}

import { defineStore } from 'pinia'
import { getDictByCodeApi, getDictByCodesApi } from '@/api/system/dict'
import { setStorageItem, getStorageItem } from '@/common/storage'
import type { DictItem } from '@/api/system/dict/types'
import { ref } from 'vue'

export const useDictStore = defineStore('dict', () => {
  const dicts = ref<Record<string, DictItem[]>>(JSON.parse(getStorageItem('dict') || '{}'))

  function setDict(dictCode: string, dictItems: DictItem[]) {
    dicts.value[dictCode] = dictItems
    setStorageItem('dict', JSON.stringify(dicts.value))
  }

  function clearDict() {
    dicts.value = {}
  }

  // 根据store的数据提供翻译结果
  function translate(dictCode: string, dictItemCode: string) {
    if (!dictCode || !dictItemCode) return ''
    return (
      dicts.value[dictCode]?.find((item) => item.dictItemCode === dictItemCode)?.dictItemName || ''
    )
  }

  // 根据一个字典编码获取字典条目
  async function getDict(dictCode: string) {
    const dict = dicts.value[dictCode]
    if (!dict || !dict.length) {
      const result = await getDictByCodeApi(dictCode)
      setDict(dictCode, result)
      return result
    } else {
      return dict
    }
  }

  // 根据字典编码数组获取对应的字典条目
  async function getDicts(dictCodeArr: string[]) {
    const resArr: Array<DictItem[]> = new Array(dictCodeArr.length).fill([])
    const dictMap: Record<string, number> = {}
    dictCodeArr.forEach((dictCode, index) => {
      if (dicts.value[dictCode]) {
        resArr[index] = dicts.value[dictCode]
      } else {
        dictMap[dictCode] = index
      }
    })
    const needFetchDict = Object.keys(dictMap)
    if (needFetchDict.length) {
      const result = await getDictByCodesApi(needFetchDict.join(','))
      Object.keys(result).forEach((dictCode) => {
        setDict(dictCode, result[dictCode])
        resArr[dictMap[dictCode]] = result[dictCode]
      })
      return resArr
    } else {
      return resArr
    }
  }

  return {
    translate,
    clearDict,
    getDict,
    getDicts
  }
})

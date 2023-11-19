import { onBeforeMount } from 'vue'
import { useDictStore } from '@/stores/dict'

// 单个字典翻译，返回一个翻译函数
export function useDict(dictCode: string) {
  const dictStore = useDictStore()
  onBeforeMount(() => {
    dictStore.getDict(dictCode)
  })
  function translate(dictItemCode: string) {
    return dictStore.translate(dictCode, dictItemCode)
  }
  return translate
}

// 多个字典翻译，返回一个数组，数组每一项是一个翻译函数
export function useDicts(dictCodeArr: string[]) {
  const dictStore = useDictStore()
  onBeforeMount(() => {
    dictStore.getDicts(dictCodeArr)
  })
  const translateArr: ((dictItemCode: string) => string)[] = dictCodeArr.map((dictCode) => {
    return function translate(dictItemCode: string) {
      return dictStore.translate(dictCode, dictItemCode)
    }
  })
  return translateArr
}

import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import type { ECharts } from 'echarts/core'

export function useEcharts(echartsInstance: Ref<ECharts | undefined>) {
  onMounted(() => {
    console.log('????')
    window.addEventListener('resize', resizeEcharts)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeEcharts)
  })

  function resizeEcharts() {
    echartsInstance.value?.resize()
  }
  return {}
}

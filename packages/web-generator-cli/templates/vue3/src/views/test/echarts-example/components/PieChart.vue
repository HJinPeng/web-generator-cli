<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import type { PieSeriesOption } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import type { TooltipComponentOption, LegendComponentOption } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useEcharts } from './use-echarts'

// 注册组件
echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

type ECOption = ComposeOption<PieSeriesOption | TooltipComponentOption | LegendComponentOption>

const option: ECOption = {
  legend: {
    show: true
  },
  tooltip: {
    show: true
  },
  series: [
    {
      name: '人数统计',
      type: 'pie',
      radius: ['20%', '60%'],
      center: ['50%', '55%'],
      roseType: 'radius',
      label: {
        show: true,
        formatter: '{b}\n{d}%'
      },
      emptyCircleStyle: {
        color: '#0f71e41a'
      },
      data: []
    }
  ]
}
const chart = ref<HTMLDivElement | null>(null)

let echartsInstance = ref<echarts.ECharts>()
function fetch() {
  echartsInstance.value?.showLoading()
  setTimeout(() => {
    option.series = [
      {
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
    echartsInstance.value?.setOption(option)
    echartsInstance.value?.hideLoading()
  }, 2000)
}

// 设置resize
useEcharts(echartsInstance)

onMounted(() => {
  echartsInstance.value = echarts.init(chart.value)
  echartsInstance.value?.setOption(option)
  fetch()
})
</script>

<template>
  <BaseCard title="饼图" border>
    <div ref="chart" style="height: 300px"></div>
  </BaseCard>
</template>

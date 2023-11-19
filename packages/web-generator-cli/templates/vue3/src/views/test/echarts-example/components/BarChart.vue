<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import type { BarSeriesOption } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import type {
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useEcharts } from './use-echarts'

// 注册组件
echarts.use([BarChart, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer])

type ECOption = ComposeOption<
  BarSeriesOption | TooltipComponentOption | GridComponentOption | LegendComponentOption
>

const option: ECOption = {
  color: ['#32c9c1', '#f5a623'],
  grid: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  },
  legend: {
    show: true
  },
  tooltip: {
    show: true
  },
  xAxis: {
    type: 'category',
    data: ['zhouyi']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '人数',
      data: [],
      type: 'bar'
    },
    {
      name: '总数',
      data: [],
      type: 'bar'
    }
  ]
}
const chart = ref<HTMLDivElement | null>(null)

let echartsInstance = ref<echarts.ECharts>()
function fetch() {
  echartsInstance.value?.showLoading()
  setTimeout(() => {
    option.xAxis = {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
    option.series = [
      {
        data: [10, 52, 22, 17, 20, 5, 60]
      },
      {
        data: [17, 20, 5, 30, 10, 52, 22]
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
  <BaseCard title="柱状图" border>
    <div ref="chart" style="height: 300px"></div>
  </BaseCard>
</template>

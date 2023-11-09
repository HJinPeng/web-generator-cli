<template>
  <BaseCard title="饼图" border>
    <div ref="chart" style="height: 300px"></div>
  </BaseCard>
</template>

<script>
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册组件
echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

export default {
  data() {
    return {
      option: {
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
    }
  },
  mounted() {
    this.echartsInstance = echarts.init(this.$refs.chart)
    this.echartsInstance.setOption(this.option)
    this.fetch()
  },
  methods: {
    fetch() {
      this.echartsInstance.showLoading()
      setTimeout(() => {
        this.option.series[0].data = [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
        this.echartsInstance.setOption(this.option)
        this.echartsInstance.hideLoading()
      }, 2000)
    }
  }
}
</script>

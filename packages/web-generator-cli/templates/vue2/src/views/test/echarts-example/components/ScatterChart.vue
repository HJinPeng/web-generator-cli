<template>
  <BaseCard title="散点图" border>
    <div ref="chart" style="height: 300px"></div>
  </BaseCard>
</template>

<script>
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import resizeEcharts from './resizeEcharts'

// 注册组件
echarts.use([ScatterChart, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer])

export default {
  mixins: [resizeEcharts],
  data() {
    return {
      option: {
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
        xAxis: {},
        yAxis: {},
        series: [
          {
            name: '活跃量',
            data: [],
            type: 'scatter'
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
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ]
        this.echartsInstance.setOption(this.option)
        this.echartsInstance.hideLoading()
      }, 2000)
    }
  }
}
</script>

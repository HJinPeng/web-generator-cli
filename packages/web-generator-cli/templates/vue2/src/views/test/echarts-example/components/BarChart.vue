<template>
  <BaseCard title="柱状图" border>
    <div ref="chart" style="height: 300px"></div>
  </BaseCard>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import resizeEcharts from './resizeEcharts'

// 注册组件
echarts.use([BarChart, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer])

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
        xAxis: {
          type: 'category',
          data: []
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
        this.option.xAxis.data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        this.option.series[0].data = [10, 52, 22, 17, 20, 5, 60]
        this.option.series[1].data = [17, 20, 5, 30, 10, 52, 22]
        this.echartsInstance.setOption(this.option)
        this.echartsInstance.hideLoading()
      }, 2000)
    }
  }
}
</script>

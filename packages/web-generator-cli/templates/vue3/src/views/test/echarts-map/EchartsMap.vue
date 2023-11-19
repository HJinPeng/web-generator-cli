<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption } from 'echarts/core'
import { MapChart } from 'echarts/charts'
import type { MapSeriesOption } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent } from 'echarts/components'
import type { TooltipComponentOption, VisualMapComponentOption } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useEcharts } from './use-echarts'
import tooltipImg from './tooltip.png'
import chinaJson from './china'
import { provinceArr } from './data.js'

// 注册组件
echarts.use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer])

type ECOption = ComposeOption<MapSeriesOption | TooltipComponentOption | VisualMapComponentOption>

const top = 'middle'
const zoom = 0.95
let curSelectedProvince: string | null = null
let provinceData = getData()

function getData(dataMap: Record<string, number> = {}) {
  return provinceArr.map((item) => {
    const data = {
      ...item,
      value: dataMap[item.fullName] || 0
    }
    return data
  })
}

const option: ECOption = {
  tooltip: {
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    extraCssText: 'box-shadow: none',
    formatter: (params: any) => {
      const data = params.data || {}
      return `<div style="display: flex; flex-direction: column; align-items: center;">
          <div style="display:flex; align-items: center; color: #fff;background: rgba(10,26,52,0.9);box-shadow: inset 0px 0px 5px 1px rgba(3,251,255,0.65);border-radius: 3px;border: 1px solid #FFCD00;padding: 6px 10px;">
            <span style="padding-right: 6px; border-right: 1px dashed #FFCD00;">${data.name}</span>
            <span style="padding-left: 6px;">${data.value}辆</span>
          </div>
          <img src="${tooltipImg}" style="margin-top: -6px"/>
        </div>`
    },
    position: function (pos, params, dom, rect, size) {
      return [pos[0] - size.contentSize[0] / 2, pos[1] - size.contentSize[1] + 10]
    }
  },
  visualMap: [
    {
      min: 0,
      max: 100,
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#0c1864', '#0565f7'],
        colorAlpha: 1,
        colorSaturation: 1
      },
      itemHeight: 140,
      itemWidth: 20,
      textStyle: {
        color: '#ccc'
      }
    }
  ],
  geo: [
    {
      map: 'China',
      regions: [
        {
          name: 'China'
        }
      ],
      top,
      zoom,
      aspectScale: 0.9,
      zlevel: -1,
      itemStyle: {
        areaColor: '#276294',
        shadowColor: '#276294',
        shadowOffsetX: 0,
        shadowOffsetY: 15
      }
    },
    {
      map: 'China',
      top,
      regions: [
        {
          name: 'China'
        }
      ],
      zoom,
      aspectScale: 0.9,
      zlevel: -2,
      itemStyle: {
        areaColor: '#1d4169',
        shadowColor: '#1d4169',
        shadowOffsetX: 0,
        shadowOffsetY: 30
      }
    }
  ],
  series: [
    {
      top,
      name: '中国',
      type: 'map',
      map: 'China',
      aspectScale: 0.9,
      zoom,
      label: {
        show: true,
        color: '#fff'
      },
      selectedMode: 'single',
      itemStyle: {
        borderColor: '#65d7f1'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#13bf90'
        },
        label: {
          color: '#ffffff'
        }
      },
      select: {
        itemStyle: {
          areaColor: '#13bf90'
        },
        label: {
          color: '#ffffff'
        }
      },
      data: getData() as any
    }
  ]
}
const chart = ref<HTMLDivElement | null>(null)

let echartsInstance = ref<echarts.ECharts>()

function handleData(data: { province: string; data: number }[]) {
  const dataMap: Record<string, number> = {}
  let maxVal = 0
  let minVal = 0
  data.forEach((item) => {
    dataMap[item.province] = item.data
    minVal = Math.min(minVal, item.data)
    maxVal = Math.max(maxVal, item.data)
  })
  option.visualMap = [{ min: minVal, max: maxVal }]
  // 省份数据
  provinceData = getData(dataMap)
  option.series = [{ map: 'China', data: provinceData }]
  echartsInstance.value?.setOption(option)
}
function fetch() {
  echartsInstance.value?.showLoading({ maskColor: '#0a0b4444', textColor: '#fff' })
  setTimeout(() => {
    handleData([
      { province: '广东省', data: 6322 },
      { province: '新疆维吾尔自治区', data: 1567 },
      { province: '广西壮族自治区', data: 3451 },
      { province: '内蒙古自治区', data: 2451 },
      { province: '四川省', data: 4235 }
    ])
    echartsInstance.value?.hideLoading()
  }, 2000)
}

// 设置resize
useEcharts(echartsInstance)

onMounted(() => {
  echarts.registerMap('China', chinaJson as any)
  echartsInstance.value = echarts.init(chart.value)
  echartsInstance.value?.setOption(option)
  echartsInstance.value?.on('selectchanged', (e: any) => {
    if (e.isFromClick) {
      if (e.fromAction === 'select') {
        const dataIndex = e.fromActionPayload.dataIndexInside
        curSelectedProvince = provinceData[dataIndex].fullName
        console.log('选中省份:', curSelectedProvince)
      } else {
        curSelectedProvince = null
        console.log('取消选中')
      }
    }
  })
  fetch()
})
</script>

<template>
  <AppPage cls="test-echarts-map">
    <BaseCard cls="card">
      <div cls="main">
        <div ref="chart" cls="map" />
        <img src="./south-sea.png" alt="南海诸岛" cls="south-sea" />
        <div cls="tip">
          <BaseIcon icon="click-pointer" cls="pointer" />
          <span cls="tip__text">点击地图可切换区域</span>
        </div>
      </div>
    </BaseCard>
  </AppPage>
</template>

<style lang="less" module>
.test-echarts-map {
  .card {
    height: 100%;
    background: #0a0b44;
  }
  :global(.base-card__body) {
    height: 100%;
  }
  .main {
    position: relative;
    height: 100%;
  }
  .map {
    height: 100%;
  }
  .south-sea {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .pointer {
    color: #fff;
  }
  .tip {
    position: absolute;
    bottom: 0;
    left: 50%;
    font-size: 18px;
    text-align: center;
    transform: translateX(-50%);
    &__text {
      margin-left: 5px;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>

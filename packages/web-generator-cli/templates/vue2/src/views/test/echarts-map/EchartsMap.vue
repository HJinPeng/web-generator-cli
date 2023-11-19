<template>
  <AppPage class="test-echarts-map">
    <BaseCard class="card">
      <div class="main">
        <div ref="map" class="map" />
        <img src="./south-sea.png" alt="南海诸岛" class="south-sea" />
        <div class="tip">
          <BaseIcon icon="#click-pointer" class="pointer" />
          <span class="tip__text">点击地图可切换区域</span>
        </div>
      </div>
    </BaseCard>
  </AppPage>
</template>

<script>
import * as ECharts from 'echarts/core'
import { MapChart } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import tooltipImg from './tooltip.png'
import resizeEcharts from './resizeEcharts.js'
import chinaJson from './china.json'
import { provinceArr } from './data.js'
ECharts.use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer])
export default {
  mixins: [resizeEcharts],
  data() {
    const top = 'middle'
    const zoom = 0.95
    return {
      curSelectedProvince: null,
      provinceData: this.getData(),
      option: {
        tooltip: {
          padding: 0,
          backgroundColor: 'transparent',
          borderWidth: 0,
          extraCssText: 'box-shadow: none',
          formatter: (params) => {
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
            data: this.getData()
          }
        ]
      }
    }
  },
  mounted() {
    ECharts.registerMap('China', chinaJson)
    this.echartsInstance = ECharts.init(this.$refs.map)
    this.echartsInstance.setOption(this.option)
    this.echartsInstance.on('selectchanged', (e) => {
      if (e.isFromClick) {
        if (e.fromAction === 'select') {
          const dataIndex = e.fromActionPayload.dataIndexInside
          this.curSelectedProvince = this.provinceData[dataIndex].fullName
          console.log('选中省份:', this.curSelectedProvince)
        } else {
          this.curSelectedProvince = null
          console.log('取消选中')
        }
      }
    })
    this.fetch()
  },
  methods: {
    fetch() {
      this.echartsInstance.showLoading({ maskColor: '#0a0b4444', textColor: '#fff' })
      setTimeout(() => {
        this.handleData([
          { province: '广东省', data: 6322 },
          { province: '新疆维吾尔自治区', data: 1567 },
          { province: '广西壮族自治区', data: 3451 },
          { province: '内蒙古自治区', data: 2451 },
          { province: '四川省', data: 4235 }
        ])
        this.echartsInstance.hideLoading()
      }, 2000)
    },
    getData(dataMap = {}) {
      return provinceArr.map((item) => {
        const data = {
          ...item,
          value: dataMap[item.fullName] || 0
        }
        return data
      })
    },
    handleData(v) {
      const dataMap = {}
      let maxVal = 0
      let minVal = 0
      v.forEach((item) => {
        dataMap[item.province] = item.data
        minVal = Math.min(minVal, item.data)
        maxVal = Math.max(maxVal, item.data)
      })
      this.option.visualMap[0].min = minVal
      this.option.visualMap[0].max = maxVal
      // 省份数据
      this.provinceData = this.getData(dataMap)
      this.option.series[0].data = this.provinceData
      this.echartsInstance.setOption(this.option)
    }
  }
}
</script>

<style lang="less" scoped>
.test-echarts-map {
  .card {
    height: 100%;
    background: #0a0b44;
  }
  :deep(.base-card__body) {
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

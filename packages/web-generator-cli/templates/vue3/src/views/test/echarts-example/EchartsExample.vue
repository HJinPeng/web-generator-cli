<script setup lang="ts">
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import BarLineChart from './components/BarLineChart.vue'
import StackBarChart from './components/StackBarChart.vue'
import PieChart from './components/PieChart.vue'
import ScatterChart from './components/ScatterChart.vue'
</script>
<template>
  <AppPage cls="echarts-example">
    <div cls="main">
      <BarChart />
      <LineChart />
      <BarLineChart />
      <StackBarChart />
      <PieChart />
      <ScatterChart />
    </div>
  </AppPage>
</template>

<style lang="less" module>
.echarts-example {
  .main {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
    > * {
      width: calc(33.33% - 8px);
      margin: 4px;
    }
  }
}
</style>

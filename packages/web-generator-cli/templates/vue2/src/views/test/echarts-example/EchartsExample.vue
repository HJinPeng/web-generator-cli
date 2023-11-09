<template>
  <AppPage class="echarts-example">
    <div class="main">
      <BarChart />
      <LineChart />
      <BarLineChart />
      <StackBarChart />
      <PieChart />
      <ScatterChart />
    </div>
  </AppPage>
</template>

<script>
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import BarLineChart from './components/BarLineChart.vue'
import StackBarChart from './components/StackBarChart.vue'
import PieChart from './components/PieChart.vue'
import ScatterChart from './components/ScatterChart.vue'
export default {
  components: {
    BarChart,
    LineChart,
    BarLineChart,
    StackBarChart,
    PieChart,
    ScatterChart
  }
}
</script>

<style lang="less" scoped>
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

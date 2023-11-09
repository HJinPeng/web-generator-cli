<template>
  <AppPage class="echarts-example">
    <BaseCard>
      <div class="main">
        <BarChart />
        <LineChart />
        <BarLineChart />
        <StackBarChart />
        <PieChart />
        <ScatterChart />
      </div>
    </BaseCard>
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
    margin: -6px;
    > * {
      width: calc(33.33% - 12px);
      margin: 6px;
    }
  }
}
</style>

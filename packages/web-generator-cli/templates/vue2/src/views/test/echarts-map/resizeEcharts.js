export default {
  mounted() {
    window.addEventListener('resize', this.resizeEcharts)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEcharts)
  },
  methods: {
    resizeEcharts() {
      this.echartsInstance.resize()
    }
  }
}

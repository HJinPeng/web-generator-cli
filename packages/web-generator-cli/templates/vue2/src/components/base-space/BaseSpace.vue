<script>
export default {
  render() {
    const children = []
    this.$slots.default.forEach((node, index) => {
      if (index !== 0) {
        children.push(<i class="base-space__separator" />)
      }
      children.push(node)
    })
    return <div class="base-space">{children}</div>
  }
}
</script>

<style lang="less">
.base-space {
  display: flex;
  align-items: center;
  &__separator {
    width: 1px;
    height: 100%;
    height: 12px;
    margin: 0 10px;
    background: #999;
  }
}
</style>

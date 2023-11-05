<script>
/**
 * 
  ## BaseIcon
  ### 使用

  ```html
  // 使用 assets/svg/* 文件夹下的svg
  <BaseIcon icon="#upload" />
  // 使用 assets/svg/colorful/* 文件夹下的svg
  <BaseIcon icon="#colorful/upload" />
  ```

  ### 约定

  1. assets/svg/colorful/\* 文件夹下的 svg 不会删除颜色
  2. assets/svg/\* 文件夹的 svg（除第一条约定）都会删除颜色，可设置 color

 */
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  render() {
    return (
      <svg class="base-icon">
        <use
          attrs={{
            'xlink:href': this.icon
          }}
        />
      </svg>
    )
  }
}
</script>

<style lang="less">
.base-icon {
  /*将icon大小设置和字体大小一致，后续在通过svg-icon 使用icon的时候，可直接设置图标的font-size即可控制图标大小 */
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  fill: currentColor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
}
</style>

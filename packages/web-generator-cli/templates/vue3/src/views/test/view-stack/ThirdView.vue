<template>
  <AppPage>
    <BaseCard title="ThirdView">
      <p>第三个页面</p>
      <p>点击面包屑切换</p>
      <router-link
        :to="{
          name: 'TestViewStackFourth',
          params: { id: '200' }
        }"
      >
        点击前往 FourthView.vue
      </router-link>
    </BaseCard>
  </AppPage>
</template>

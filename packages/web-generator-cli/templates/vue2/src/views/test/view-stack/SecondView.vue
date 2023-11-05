<template>
  <AppPage>
    <BaseCard title="SecondView">
      <p>第二个页面</p>
      <p>点击面包屑切换</p>
      <router-link
        :to="{
          name: 'TestViewStackThird',
          query: { name: 'from-second' }
        }"
      >
        点击前往 ThirdView.vue
      </router-link>
    </BaseCard>
  </AppPage>
</template>

<template>
  <AppPage>
    <BaseCard title="FourthView">
      <p>第四个页面</p>
      <p>点击面包屑切换</p>

      <a @click="$router.go(-1)">返回 ThirdView.vue</a>
      <br />
      <br />
      <router-link
        :to="{
          name: 'TestViewStackSecond',
          params: { id: '41' },
          query: { type: 'add', from: 'from-fourth' }
        }"
      >
        点击前往 SecondView.vue
      </router-link>
    </BaseCard>
  </AppPage>
</template>

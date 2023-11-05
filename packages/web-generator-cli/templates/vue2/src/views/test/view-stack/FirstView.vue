<template>
  <AppPage>
    <BaseCard title="FirstView">
      <p>第一个页面</p>
      <router-link
        :to="{
          name: 'TestViewStackSecond',
          params: { id: '1' },
          query: { type: 'add' }
        }"
      >
        点击前往 SecondView.vue
      </router-link>
    </BaseCard>
  </AppPage>
</template>

<template>
  <div id="app">
    <app-header/>

    <router-view></router-view>
  </div>
</template>

<script>
  import store from '@/store'
  import { router } from './bootstrap'
  import Header from '@/components/commons/Header'

  export default {
    name: 'app',

    store,

    router,

    components: {
      'app-header': Header
    }
  }
</script>

<style lang="scss">
</style>

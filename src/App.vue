<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href="#" class="navbar-brand">Casper</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="navbar-nav mr-auto">
          <router-link :to="'/'" tag="li" class="nav-item">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link :to="'/map'" tag="li" class="nav-item">
            <a class="nav-link">Events Map</a>
          </router-link>
          <router-link :to="'/login'" tag="li" class="nav-item" v-if="!$store.state.auth.authenticated">
            <a class="nav-link">Login</a>
          </router-link>
          <router-link :to="'/register'" tag="li" class="nav-item" v-if="!$store.state.auth.authenticated">
            <a class="nav-link">Register</a>
          </router-link>
          <li class="nav-item" v-if="$store.state.auth.authenticated">
            <a href="#" @click.prevent="logout()" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
  import store from '@/store'
  import { router } from './bootstrap'

  export default {
    name: 'app',

    store,

    router,

    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>

<style lang="scss">
</style>

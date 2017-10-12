<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <router-link :to="'/'" class="navbar-brand">Casper</router-link>

    <b-nav-toggle target="navbar_header"></b-nav-toggle>

    <b-collapse is-nav id="navbar_header">
      <ul class="navbar-nav mr-auto">
        <router-link :to="'/'" tag="li" class="nav-item">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link :to="'/map'" tag="li" class="nav-item">
          <a class="nav-link">Events Map</a>
        </router-link>
        <router-link :to="'/event/add'" tag="li" class="nav-item">
          <a class="nav-link">Add Event</a>
        </router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <router-link :to="'/login'" tag="li" class="nav-item" v-if="!$store.state.auth.authenticated">
          <a class="nav-link">Login</a>
        </router-link>
        <router-link :to="'/register'" tag="li" class="nav-item" v-if="!$store.state.auth.authenticated">
          <a class="nav-link">Register</a>
        </router-link>
        <li class="nav-item" v-if="$store.state.auth.authenticated">
          <span class="navbar-text">Logged as: {{ currentUser.username }}</span>
        </li>
        <li class="nav-item" v-if="$store.state.auth.authenticated">
          <a href="#" @click.prevent="logout()" class="nav-link">Logout</a>
        </li>
      </ul>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'app-header',

    computed: {
      currentUser: function () {
        return this.$store.state.auth.currentUser
      }
    },

    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>

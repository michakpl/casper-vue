<template>
  <div class="page page-login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form @submit.prevent="login()">
            <div class="alert alert-danger" role="alert" v-if="error">
              {{ error }}
            </div>
            <div class="form-group">
              <label for="username">Username/Email</label>
              <input type="text" class="form-control" name="username" v-model="form.username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password" v-model="form.password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          username: null,
          password: null
        }
      }
    },

    computed: {
      error: function () {
        return this.$store.state.auth.error
      }
    },

    methods: {
      login: function () {
        this.$store.dispatch('auth/login', {
          username: this.form.username,
          password: this.form.password
        })
      }
    }
  }
</script>

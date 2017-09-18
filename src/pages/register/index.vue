<template>
  <div class="page page-register">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form @submit.prevent="register()">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" name="username" v-model="form.username">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" name="email" v-model="form.email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password" v-model="form.password">
            </div>
            <div class="form-group">
              <label for="password_confirmation">Password confirmation</label>
              <input type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation">
            </div>
            <div class="form-group">
              <label for="gender">Gender</label>
              <select class="form-control" name="gender" v-model="form.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="birthdate">Birthdate</label>
              <input type="birthdate" class="form-control" name="birthdate" v-model="form.birthdate">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
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
          email: null,
          password: null,
          password_confirmation: null,
          gender: 'male',
          birthdate: null
        }
      }
    },

    methods: {
      register () {
        this.$store.dispatch('user/register', this.form)
      }
    }
  }
</script>

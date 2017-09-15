<template>
  <div class="page page-login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form @submit.prevent="login()">
            <div class="form-group">
              <label for="username">Username/Email</label>
              <input name="username" id="username" placeholder="Enter email" class="form-control">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter password" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Form from '@/utils/Form'

  export default {
    data () {
      return {
        form: new Form({
          username: null,
          password: null
        })
      }
    },

    methods: {
      login: function () {
        this.form.post('/')
      }
    }
  }
</script>
